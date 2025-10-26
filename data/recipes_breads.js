const recipesBreads = [
    {
        "id": "classic-english-muffins",
        "title": "Classic English Muffins",
        "category": "Breads, Doughs & Tortillas",
        "ingredients": [
            "3 cups (360g) All-Purpose Flour",
            "1 cup (240ml) Milk",
            "1/4 cup (60ml) Warm Water (105-115°F)",
            "2 tsp (10g) Instant Yeast",
            "1 tbsp (13g) Sugar",
            "1 tsp (6g) Salt",
            "2 tbsp (28g) Unsalted Butter, softened",
            "Cornmeal (for dusting)"
        ],
        "instructions": [
            "Activate Yeast (if Active Dry): Combine warm water, sugar, and yeast. Let sit 5-10 min.",
            "Mix Dough: Whisk flour/salt. Warm milk/butter. Add wet to dry and mix. Knead 6-8 min until smooth but tacky.",
            "First Proof: Oiled bowl. Combi: 85-90°F @ 80% humidity for 30-45 min. (Standard: 1-1.5 hours).",
            "Shape: Roll dough to 1/2-inch thick. Cut with 3-inch cutter.",
            "Second Proof: Place on cornmeal-dusted sheet. Combi: 85-90°F @ 80% humidity for 20-30 min. (Standard: 30-45 min).",
            "Cook: On low/medium-low skillet for 5-8 minutes per side. Cool on wire rack."
        ]
    },
    {
        "id": "pizza-dough",
        "title": "Pizza Dough",
        "category": "Breads, Doughs & Tortillas",
        "ingredients": [
            "690 g Flour",
            "20g Salt",
            "9g Yeast",
            "15g Sugar",
            "455g Water",
            "15g Olive Oil"
        ],
        "instructions": [
            "Using a dough hook, mix until solid on Low.",
            "Mix for 5 minutes on Medium.",
            "Knead on a floured counter.",
            "Cover and let rise for 18-24 hours."
        ]
    },
    {
        "id": "pita",
        "title": "Pita",
        "category": "Breads, Doughs & Tortillas",
        "ingredients": [
            "400g flour",
            "100g whole wheat flour",
            "7g yeast",
            "1/4 tsp sugar",
            "2 tsp salt",
            "325g water"
        ],
        "instructions": [
            "Mix dough, cover with oil, and let rise for 1-1.5 hours.",
            "Split into 8 balls. Let rise for 30 minutes.",
            "Roll 1/4 inch thick and let rest for 15 minutes.",
            "Cook (on a hot skillet or pizza stone)."
        ]
    },
    {
        "id": "flour-tortillas-6x",
        "title": "Flour Tortillas (6x)",
        "category": "Breads, Doughs & Tortillas",
        "ingredients": [
            "1 3/4 cup flour",
            "5 Tbsp butter (melted)",
            "3/4 cup water",
            "3/4 tsp salt"
        ],
        "instructions": [
            "Dissolve salt in water.",
            "Add melted butter/flour to a mixer.",
            "Pour in salt water until you reach the right consistency (meatball-sized dough balls).",
            "Cook on a griddle."
        ]
    },
    {
        "id": "tortilla-winner-x6-8",
        "title": "Tortilla (Winner x6-8)",
        "category": "Breads, Doughs & Tortillas",
        "ingredients": [
            "1 cup flour",
            "1 cup masa",
            "2 Tbsp melted butter",
            "1 cup water",
            "(For 2x: 1/4 cup each)"
        ],
        "instructions": [
            "In a tortilla press, squish the dough ball.",
            "Rotate the dough, and squish again.",
            "Cook on an open griddle/pan."
        ]
    },
    {
        "id": "pasta-dough",
        "title": "Pasta Dough",
        "category": "Breads, Doughs & Tortillas",
        "ingredients": [
            "1 cup flour",
            "1 egg",
            "Olive oil",
            "Salt",
            "Water (for consistency)"
        ],
        "instructions": [
            "Combine ingredients to form a dough.",
            "Roll down in pasta maker to setting 3 or 2.",
            "Cut as desired."
        ]
    },
    {
        "id": "wonton-dough",
        "title": "Wonton Dough",
        "category": "Breads, Doughs & Tortillas",
        "ingredients": [
            "2 cups flour",
            "1 egg",
            "3/4 tsp salt",
            "1/2 cup water"
        ],
        "instructions": [
            "Combine to form a dough.",
            "Use a pasta roller to roll thin (Setting 1)."
        ]
    },
    {
        "id": "ramen-dough-x4",
        "title": "Ramen Dough (x4)",
        "category": "Breads, Doughs & Tortillas",
        "ingredients": [
            "400 g flour",
            "4g salt",
            "160 g water",
            "6 g baking soda"
        ],
        "instructions": [
            "Mix ingredients.",
            "Knead (Pasta roller setting 2).",
            "Cut and let sit overnight."
        ]
    },
    {
        "id": "pierogi",
        "title": "Pierogi",
        "category": "Breads, Doughs & Tortillas",
        "ingredients": [
            "Dough: 4.5 cups flour, 3 eggs, 2 cups sour cream, 2 tsp salt, 2 Tbsp butter, 2 Tbsp oil",
            "Filling: Mashed potatoes + stuff (e.g., cheese, bacon)"
        ],
        "instructions": [
            "Make the dough (mix dry, then add wet).",
            "Roll in pasta maker to setting 3.",
            "Cut circles, fill, water the edge, and crimp.",
            "Freeze or boil."
        ]
    },
    {
        "id": "gnocchi",
        "title": "Gnocchi",
        "category": "Breads, Doughs & Tortillas",
        "ingredients": [
            "2 pounds potatoes",
            "2 cups flour",
            "2 tsp salt",
            "2 Tbsp butter",
            "1 large egg, beaten"
        ],
        "instructions": [
            "Bake or boil potatoes, then mash or rice them.",
            "Combine with flour/everything else.",
            "Knead until a dough forms, roll into ropes, and cut."
        ]
    },
    {
        "id": "lakota-fry-bread",
        "title": "Lakota Fry Bread (Indian Tacos)",
        "category": "Breads, Doughs & Tortillas",
        "ingredients": [
            "1/4 cup sugar",
            "3 teaspoons baking powder",
            "2 cups flour",
            "1 teaspoon salt",
            "1 cup water (or just enough for soft dough)",
            "Oil for frying",
            "Taco Toppings: Seasoned ground beef, cheese, lettuce, tomatoes, salsa, sour cream"
        ],
        "instructions": [
            "Mix all the dry ingredients together.",
            "Add water, mixing carefully, to make a soft dough.",
            "Divide the dough into four pieces and pat each into a round, flat shape.",
            "Add 1-2 inches of oil to a large skillet and heat to 350°F.",
            "Fry each round until crisp and brown on both sides.",
            "For Indian Tacos: Top fry bread with seasoned ground beef, cheese, lettuce, tomatoes, salsa and sour cream."
        ]
    }
];