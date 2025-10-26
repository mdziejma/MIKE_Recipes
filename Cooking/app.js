// 1. State
let currentFilter = 'all';
let currentSubCategory = null;
let currentRecipeId = null;
let currentSearch = '';

// 2. Elements
const recipeContainer = document.getElementById('recipe-container');
const searchBar = document.getElementById('search-bar');
const contentTitle = document.getElementById('content-title');
const contentIntro = document.getElementById('content-intro');
const recipeCount = document.getElementById('recipe-count');
const noResults = document.getElementById('no-results');
const categoryList = document.getElementById('category-list');
const showAllBtn = document.getElementById('show-all-btn');

const categoryIntros = {
    'all': 'Welcome to your interactive cookbook! This application allows you to browse, search, and filter all the recipes from your collection. Select a category from the sidebar or use the search bar to find a specific recipe.',
    'Breakfast': 'Start your day right. This section includes recipes for waffles, pancakes, crepes, and more.',
    'Breads, Doughs & Tortillas': 'From pizza and pasta to tortillas and pierogi, find all your foundational dough recipes here.',
    'Sourdough': 'Your dedicated section for all things sourdough, including artisan bread, crackers, and starter-based recipes.',
    'Main Courses': 'The heart of the meal. This category features everything from quick weeknight air-fryer recipes to low-and-slow smoked brisket.',
    'Sides & Appetizers': 'Complete your meal with these essential sides, including potatoes, rice pilaf, and classic appetizers.',
    'Sauces, Condiments & Brines': 'Elevate your dishes with homemade sauces, dressings, brines, and pickles.',
    'Desserts & Snacks': 'Treat yourself. Find recipes for cookies, roasted nuts, and other sweet snacks.',
    'Beverages': 'Recipes for cocktails and coffee to round out your collection.',
    'Techniques & Base Components': 'The building blocks. Learn how to make components like sodium citrate or reference core techniques like pressure-cooker reheating.'
};

// 3. Render Function
function renderRecipes() {
    recipeContainer.innerHTML = '';
    let count = 0;
    let filteredRecipes = [];

    // De-duplicate the raw data first, keeping the latest by ID
    const uniqueRecipesById = {};
    // allRecipes is now globally available from recipes.js
    allRecipes.forEach(recipe => {
        uniqueRecipesById[recipe.id] = recipe; // Overwrites older with newer if IDs match
    });
    const latestUniqueRecipes = Object.values(uniqueRecipesById);


    if (currentRecipeId) {
        filteredRecipes = latestUniqueRecipes.filter(recipe => recipe.id === currentRecipeId);
        const recipe = filteredRecipes[0];
        if (recipe) {
            contentTitle.textContent = recipe.title;
            contentIntro.textContent = `Showing details for ${recipe.title}.`;
        }
    } else if (currentSearch) {
        filteredRecipes = latestUniqueRecipes.filter(recipe => 
            recipe.title.toLowerCase().includes(currentSearch) ||
            recipe.ingredients.join(' ').toLowerCase().includes(currentSearch)
        );
        contentTitle.textContent = `Search Results for "${currentSearch}"`;
        contentIntro.textContent = `Found ${filteredRecipes.length} recipes matching your search.`;
    } else if (currentSubCategory) {
        filteredRecipes = latestUniqueRecipes.filter(recipe => 
            recipe.category === currentFilter && recipe.subCategory === currentSubCategory
        );
        contentTitle.textContent = `${currentFilter}: ${currentSubCategory}`;
        contentIntro.textContent = `Showing all ${currentSubCategory} recipes.`;
    } else {
        filteredRecipes = (currentFilter === 'all') 
            ? latestUniqueRecipes 
            : latestUniqueRecipes.filter(recipe => recipe.category === currentFilter);
        
        contentTitle.textContent = currentFilter === 'all' ? 'All Recipes' : currentFilter;
        contentIntro.textContent = categoryIntros[currentFilter] || 'Browse the recipes in this category.';
    }
            
    count = filteredRecipes.length;


    if (count === 0) {
        noResults.classList.remove('hidden');
    } else {
        noResults.classList.add('hidden');
    }

    filteredRecipes.sort((a,b) => a.title.localeCompare(b.title)).forEach(recipe => { // Sort alphabetically before rendering
        const card = `
            <div class="bg-white shadow-lg rounded-xl overflow-hidden flex flex-col transform transition-all duration-300 hover:shadow-2xl">
                <div class="p-6">
                    <h3 class="text-2xl font-bold text-teal-700 mb-3">${recipe.title}</h3>
                    <span class="inline-block bg-teal-100 text-teal-800 text-xs font-medium px-2.5 py-0.5 rounded-full mb-4">${recipe.category}</span>
                    
                    <h4 class="text-lg font-semibold text-stone-700 mb-2">Ingredients</h4>
                    <ul class="list-disc list-inside text-stone-600 space-y-1 mb-4 text-sm">
                        ${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}
                    </ul>
                    
                    <h4 class="text-lg font-semibold text-stone-700 mb-2">Instructions</h4>
                    <div class="text-stone-600 space-y-2 text-sm">
                        ${recipe.instructions.map(inst => `<p>${inst}</p>).join('')}
                    </div>
                </div>
            </div>
        `;
        recipeContainer.innerHTML += card;
    });
    
    recipeCount.textContent = `${count} ${count === 1 ? 'Recipe' : 'Recipes'}`;
}

// 4. Event Handlers
function handleFilter(category, element) {
    currentFilter = category;
    currentSubCategory = null;
    currentRecipeId = null;
    currentSearch = '';
    searchBar.value = '';
    
    document.querySelectorAll('.nav-button, .sub-nav-button, .recipe-link').forEach(el => el.classList.remove('active'));
    
    if(element) {
        element.classList.add('active');
    }
    
    document.querySelectorAll('.recipe-submenu, .recipe-list-submenu').forEach(submenu => {
            if (!element || !submenu.contains(element)) { 
            submenu.classList.add('hidden');
            }
    });
        if (category !== 'all' && element && element.nextElementSibling && element.nextElementSibling.classList.contains('recipe-submenu')) {
            element.nextElementSibling.classList.remove('hidden');
    }
    
    renderRecipes();
}

function handleSubCategoryFilter(category, subCategory, element) {
    currentFilter = category;
    currentSubCategory = subCategory;
    currentRecipeId = null;
    currentSearch = '';
    searchBar.value = '';

    document.querySelectorAll('.sub-nav-button, .recipe-link').forEach(el => el.classList.remove('active'));
    
    element.classList.add('active');
    
    const parentCatMenu = element.closest('.recipe-submenu');
    if (parentCatMenu && parentCatMenu.previousElementSibling) {
        parentCatMenu.previousElementSibling.classList.add('active');
    }

    
    document.querySelectorAll('.recipe-list-submenu').forEach(submenu => {
            submenu.classList.add('hidden');
    });
    
    if (element.nextElementSibling) {
        element.nextElementSibling.classList.remove('hidden');
    }

    renderRecipes();
}

function handleRecipeClick(recipeId, element) {
    currentRecipeId = recipeId;
    currentSearch = '';
    searchBar.value = '';

    document.querySelectorAll('.recipe-link').forEach(el => el.classList.remove('active'));
    
    element.classList.add('active');
    
    const parentSubMenu = element.closest('.recipe-list-submenu');
    if (parentSubMenu && parentSubMenu.previousElementSibling) {
        parentSubMenu.previousElementSibling.classList.add('active');
    }
    
    const parentCatMenu = element.closest('.recipe-submenu');
        if (parentCatMenu && parentCatMenu.previousElementSibling) {
        parentCatMenu.previousElementSibling.classList.add('active');
    }


    renderRecipes();
}

function handleSearch() {
    currentSearch = searchBar.value.toLowerCase();
    currentFilter = 'all';
    currentSubCategory = null;
    currentRecipeId = null;

    document.querySelectorAll('.nav-button, .sub-nav-button, .recipe-link').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.recipe-submenu, .recipe-list-submenu').forEach(submenu => submenu.classList.add('hidden'));
    
    showAllBtn.classList.add('active');

    renderRecipes();
}

// 5. Initialization
function generateCategories() {
    const uniqueRecipes = {};
    // allRecipes is globally available
    allRecipes.forEach(recipe => {
        uniqueRecipes[recipe.id] = recipe;
    });
    const latestRecipes = Object.values(uniqueRecipes);

    const recipesByCategory = latestRecipes.reduce((acc, recipe) => {
        if (!acc[recipe.category]) {
            acc[recipe.category] = [];
        }
        acc[recipe.category].push(recipe);
        return acc;
    }, {});

    const categoryOrder = [
        'Breakfast',
        'Breads, Doughs & Tortillas',
        'Sourdough',
        'Main Courses',
        'Sides & Appetizers',
        'Sauces, Condiments & Brines',
        'Desserts & Snacks',
        'Beverages',
        'Techniques & Base Components'
    ];
    
    Object.keys(recipesByCategory).forEach(category => {
        if (!categoryOrder.includes(category)) {
            categoryOrder.push(category);
        }
    });


    categoryOrder.forEach((category, index) => {
        if (!recipesByCategory[category]) return;
        
        const li = document.createElement('li');
        
        const button = document.createElement('button');
        button.className = 'nav-button flex justify-between items-center w-full text-left px-4 py-2 rounded-lg hover:bg-stone-100 transition-colors duration-150';
        button.innerHTML = `
            <span>${index + 1}. ${category}</span>
            <span class="chevron transform transition-transform duration-150 text-stone-400">&gt;</span>
        `;
        button.onclick = () => handleFilter(category, button);
        
        const submenu = document.createElement('ul');
        submenu.className = 'recipe-submenu hidden ml-4 space-y-1 mt-1';
        
        if (category === 'Main Courses') {
            const recipesBySubCategory = recipesByCategory[category].reduce((acc, recipe) => {
                const subCat = recipe.subCategory || 'Other';
                if (!acc[subCat]) {
                    acc[subCat] = [];
                }
                acc[subCat].push(recipe);
                return acc;
            }, {});

            Object.keys(recipesBySubCategory).sort().forEach(subCat => {
                const subLi = document.createElement('li');
                
                const subButton = document.createElement('button');
                subButton.className = 'sub-nav-button';
                subButton.innerHTML = `
                    <span>${subCat}</span>
                    <span class="chevron-sub transform transition-transform duration-150 text-stone-400">&gt;</span>
                `;
                subButton.onclick = (e) => {
                    e.stopPropagation(); 
                    handleSubCategoryFilter(category, subCat, subButton);
                };
                
                const recipeListUl = document.createElement('ul');
                recipeListUl.className = 'recipe-list-submenu hidden space-y-1 mt-1';
                
                recipesBySubCategory[subCat].sort((a,b) => a.title.localeCompare(b.title)).forEach(recipe => {
                    const recipeLi = document.createElement('li');
                    recipeLi.className = 'recipe-link px-4 py-1';
                    recipeLi.textContent = recipe.title;
                    recipeLi.onclick = (e) => {
                        e.stopPropagation();
                        handleRecipeClick(recipe.id, recipeLi);
                    };
                    recipeListUl.appendChild(recipeLi);
                });
                
                subLi.appendChild(subButton);
                subLi.appendChild(recipeListUl);
                submenu.appendChild(subLi);
            });

        } else {
            recipesByCategory[category].sort((a,b) => a.title.localeCompare(b.title)).forEach(recipe => {
                const recipeLi = document.createElement('li');
                recipeLi.className = 'recipe-link px-4 py-1';
                recipeLi.textContent = recipe.title;
                recipeLi.onclick = (e) => {
                    e.stopPropagation();
                    handleRecipeClick(recipe.id, recipeLi);
};
                submenu.appendChild(recipeLi);
            });
        }
        
        li.appendChild(button);
        li.appendChild(submenu);
        categoryList.appendChild(li);
    });
}

// 6. Init
document.addEventListener('DOMContentLoaded', () => {
    generateCategories();
    searchBar.addEventListener('keyup', handleSearch);
    showAllBtn.onclick = () => handleFilter('all', showAllBtn);
    handleFilter('all', showAllBtn);
});

