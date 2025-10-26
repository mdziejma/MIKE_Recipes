// 1. State
let currentFilter = 'all';
let currentSubCategory = null;
let currentRecipeId = null;
let currentSearch = '';
let currentBookRecipes = []; // NEW: This will hold the recipes for the selected book
let loadedScripts = new Set(); // NEW: To track loaded scripts

// 2. Elements
const recipeContainer = document.getElementById('recipe-container');
const searchBar = document.getElementById('search-bar');
const contentTitle = document.getElementById('content-title');
const contentIntro = document.getElementById('content-intro');
const recipeCount = document.getElementById('recipe-count');
const noResults = document.getElementById('no-results');
const categoryList = document.getElementById('category-list');
const showAllBtn = document.getElementById('show-all-btn');
const sidebar = document.getElementById('sidebar');
const mainContent = document.getElementById('main-content');
const toggleSidebarBtn = document.getElementById('toggle-sidebar-btn');
const bookSelect = document.getElementById('book-select'); // NEW: Book dropdown


const categoryIntros = {
    // ... (This object is unchanged) ...
};

// 3. Render Function
function renderRecipes() {
    recipeContainer.innerHTML = '';
    let count = 0;
    let filteredRecipes = [];

    // De-duplicate the raw data first
    const uniqueRecipesById = {};
    // CHANGED: Use currentBookRecipes
    currentBookRecipes.forEach(recipe => {
        uniqueRecipesById[recipe.id] = recipe; 
    });
    const latestUniqueRecipes = Object.values(uniqueRecipesById);


    if (currentRecipeId) {
        // ... (rest of function is unchanged) ...
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

    filteredRecipes.sort((a,b) => a.title.localeCompare(b.title)).forEach(recipe => { 
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
                        ${recipe.instructions.map(inst => `<p>${inst}</p>`).join('')}
                    </div>
                </div>
            </div>
        `;
        recipeContainer.innerHTML += card;
    });
    
    recipeCount.textContent = `${count} ${count === 1 ? 'Recipe' : 'Recipes'}`;
}

// 4. Event Handlers
function debounce(func, delay = 300) {
    // ... (This function is unchanged) ...
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

function showMainContentOnMobile() {
    // ... (This function is unchanged) ...
    if (window.innerWidth < 768) { // md breakpoint
        sidebar.classList.add('hidden');
        mainContent.classList.remove('hidden');
        mainContent.scrollIntoView({ behavior: 'auto' });
    }
}

function showSidebarOnMobile() {
    // ... (This function is unchanged) ...
    if (window.innerWidth < 768) { // md breakpoint
        sidebar.classList.remove('hidden');
        mainContent.classList.add('hidden');
        sidebar.scrollIntoView({ behavior: 'auto' });
    }
}

function handleFilter(category, element) {
    // ... (This function is unchanged) ...
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
    // ... (This function is unchanged) ...
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
    // ... (This function is unchanged) ...
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
    // ... (This function is unchanged) ...
    currentSearch = searchBar.value.toLowerCase();
    currentFilter = 'all';
    currentSubCategory = null;
    currentRecipeId = null;

    document.querySelectorAll('.nav-button, .sub-nav-button, .recipe-link').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.recipe-submenu, .recipe-list-submenu').forEach(submenu => submenu.classList.add('hidden'));
    
    showAllBtn.classList.add('active');

    renderRecipes();
    showMainContentOnMobile();
}

// 5. Initialization
function generateCategories() {
    // Clear existing categories
    categoryList.innerHTML = '<li><button class="nav-button active w-full text-left px-4 py-2 rounded-lg hover:bg-stone-100 transition-colors duration-150" id="show-all-btn">Show All</button></li>';
    // Re-bind the 'Show All' button since we just re-created it
    document.getElementById('show-all-btn').onclick = () => {
        handleFilter('all', document.getElementById('show-all-btn'));
        showMainContentOnMobile();
    };

    // CHANGED: Use currentBookRecipes
    const uniqueRecipes = {};
    currentBookRecipes.forEach(recipe => {
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
        // ... (rest of this function is unchanged) ...
        if (!recipesByCategory[category]) return;
        
        const li = document.createElement('li');
        
        const button = document.createElement('button');
        button.className = 'nav-button flex justify-between items-center w-full text-left px-4 py-2 rounded-lg hover:bg-stone-100 transition-colors duration-150';
        button.innerHTML = `
            <span>${index + 1}. ${category}</span>
            <span class="chevron transform transition-transform duration-150 text-stone-400">&gt;</span>
        `;
        button.onclick = () => {
            handleFilter(category, button);
            showMainContentOnMobile();
        };
        
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
                    showMainContentOnMobile();
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
                        showMainContentOnMobile();
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
                    showMainContentOnMobile();
                };
                submenu.appendChild(recipeLi);
            });
        }
        
        li.appendChild(button);
        li.appendChild(submenu);
        categoryList.appendChild(li);
    });
}


// --- NEW APPLICATION INIT FUNCTIONS ---

// This function dynamically loads a script and returns a promise
function loadScript(src) {
    return new Promise((resolve, reject) => {
        // Only load if it's not already loaded
        if (loadedScripts.has(src)) {
            resolve();
            return;
        }
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => {
            loadedScripts.add(src);
            resolve();
        };
        script.onerror = () => reject(new Error(`Script load error for ${src}`));
        document.head.appendChild(script);
    });
}

// This function clears the old state and re-builds the UI
function initializeBookUI() {
    // 1. Re-generate categories in the sidebar
    generateCategories();
    
    // 2. Reset the main content view to "All Recipes"
    const showAllButton = document.getElementById('show-all-btn');
    handleFilter('all', showAllButton);

    // 3. Set the correct view for mobile/desktop
    if (window.innerWidth < 768) {
        showSidebarOnMobile(); // Show sidebar by default on book change
    } else {
        mainContent.classList.remove('hidden');
        sidebar.classList.remove('hidden');
    }
}

// This is the master function to load a new book
async function loadBook(bookId) {
    const book = allBooks[bookId];
    if (!book) {
        console.error("Book not found:", bookId);
        return;
    }

    // 1. Create a list of all scripts that need to be loaded
    const scriptPromises = book.sources.map(source => loadScript(source.file));
    
    try {
        // 2. Wait for all scripts to be loaded
        await Promise.all(scriptPromises);

        // 3. Once loaded, build the master recipe list for this book
        currentBookRecipes = [];
        for (const source of book.sources) {
            if (window[source.arrayName]) {
                currentBookRecipes.push(...window[source.arrayName]);
            } else {
                console.error(`Recipe array ${source.arrayName} not found in window.`);
            }
        }

        // 4. Now that recipes are loaded, re-initialize the UI
        initializeBookUI();

    } catch (error) {
        console.error("Failed to load one or more recipe scripts:", error);
    }
}

// This function runs once on page load to set up the book dropdown
function populateBookSelector() {
    for (const bookId in allBooks) {
        const option = document.createElement('option');
        option.value = bookId;
        option.textContent = allBooks[bookId].title;
        bookSelect.appendChild(option);
    }
}


// 6. Init
// These event listeners are attached *once* on page load.
searchBar.addEventListener('keyup', debounce(handleSearch, 300));
toggleSidebarBtn.addEventListener('click', showSidebarOnMobile);
bookSelect.addEventListener('change', (e) => loadBook(e.target.value));

// Initial page setup
populateBookSelector();

// Load the *first* book in the list by default
const defaultBookId = bookSelect.value;
loadBook(defaultBookId);