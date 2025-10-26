const recipesSauces = [
    {
        "id": "tzatziki",
        "title": "Tzatziki",
        "category": "Sauces, Condiments & Brines",
        "ingredients": [
            "16 oz yogurt",
            "1 cucumber (peeled/diced)",
            "4 garlic cloves",
            "1 Tbsp olive oil",
            "2 tsp red vinegar",
            "6 mint leaves"
        ],
        "instructions": [
            "Combine all ingredients."
        ]
    },
    {
        "id": "cheeze-sauce",
        "title": "Cheeze Sauce (Sous Vide)",
        "category": "Sauces, Condiments & Brines",
        "ingredients": [
            "8 oz Cheddar",
            "8 oz Milk",
            "11g Sodium Citrate",
            "1.5g salt"
        ],
        "instructions": [
            "Combine in a bag.",
            "Sous Vide 30 min at 165°F."
        ]
    },
    {
        "id": "mayo",
        "title": "Mayo",
        "category": "Sauces, Condiments & Brines",
        "ingredients": [
            "1 egg",
            "1 tsp salt",
            "1/2 tsp dry mustard",
            "2 tsp lemon juice",
            "1 cup oil"
        ],
        "instructions": [
            "Combine all ingredients except oil in a food processor.",
            "While running, slowly drizzle in oil until emulsified."
        ]
    },
    {
        "id": "quick-pickles",
        "title": "Quick Pickles",
        "category": "Sauces, Condiments & Brines",
        "ingredients": [
            "20 g pickle salt",
            "3/4 cup vinegar",
            "1.5 cup water",
            "2 cucumbers"
        ],
        "instructions": [
            "Slice cucumbers (Mandolin on 6).",
            "Combine in 3 1/2-pint Mason Jars.",
            "Boil brine (salt, vinegar, water) and pour over.",
            "Split brine into jars."
        ]
    },
    {
        "id": "chimichurri",
        "title": "Traditional Argentine Chimichurri",
        "category": "Sauces, Condiments & Brines",
        "ingredients": [
            "1 cup fresh parsley, finely chopped",
            "4 cloves garlic, minced",
            "3 tablespoons fresh oregano leaves, chopped (or 1 tbsp dried)",
            "1/2 cup olive oil",
            "2 tablespoons red wine vinegar",
            "1 teaspoon sea salt",
            "1/4 teaspoon freshly ground black pepper",
            "1/4 teaspoon red pepper flakes"
        ],
        "instructions": [
            "In a medium bowl, combine parsley, garlic, and oregano.",
            "Add the olive oil, red wine vinegar, salt, black pepper, and red pepper flakes.",
            "Stir well to combine all ingredients thoroughly.",
            "Let the sauce sit for at least 10 minutes to allow the flavors to meld (or refrigerate up to 24 hours)."
        ]
    },
    {
        "id": "chimichurri-alt",
        "title": "Chimichurri (Alternative)",
        "category": "Sauces, Condiments & Brines",
        "ingredients": [
            "Parsley",
            "Cilantro",
            "Green onion",
            "Garlic",
            "Salt",
            "Avocado oil",
            "Dried tomatoes"
        ],
        "instructions": [
            "Blend herbs until small.",
            "Add garlic, salt, tomatoes, and oil and re-blend."
        ]
    },
    {
        "id": "simple-syrup",
        "title": "Simple Syrup",
        "category": "Sauces, Condiments & Brines",
        "ingredients": [
            "1 part sugar",
            "1 part water"
        ],
        "instructions": [
            "Heat until sugar is dissolved."
        ]
    },
    {
        "id": "brine",
        "title": "Brine",
        "category": "Sauces, Condiments & Brines",
        "ingredients": [
            "2 qts water",
            "1/2 cup salt",
            "1/2 cup white sugar",
            "1/4 cup soy sauce"
        ],
        "instructions": [
            "Dissolve solids in water."
        ]
    },
    {
        "id": "pickle-brine",
        "title": "Pickle Brine",
        "category": "Sauces, Condiments & Brines",
        "ingredients": [
            "2 cup water",
            "1 cup vinegar",
            "1 Tbsp pickle salt"
        ],
        "instructions": [
            "Boil ingredients.",
            "Pour over cucumbers in a jar.",
            "Wait 1 week."
        ]
    },
    {
        "id":"deep-fry-batter",
        "title": "Deep Fried Batter",
        "category": "Sauces, Condiments & Brines",
        "ingredients": [
            "1 1/4 cups flour",
            "2 tsp baking powder",
            "1/4 tsp salt",
            "3/4 cup milk",
            "1 egg"
        ],
        "instructions": [
            "Mix.",
            "Coat food and put in fryer."
        ]
    },
    {
        "id": "maple-glaze",
        "title": "Maple Glaze",
        "category": "Sauces, Condiments & Brines",
        "ingredients": [
            "1 1/2 cup confectioners' sugar",
            "3 Tbsp milk",
            "3 Tbsp maple syrup"
        ],
        "instructions": [
            "Mix and let sit before topping cookies."
        ]
    },
    {
        "id": "bacon-cured",
        "title": "Bacon (Cured)",
        "category": "Sauces, Condiments & Brines",
        "ingredients": [
            "Pork Belly",
            "6 Tbsp Kosher Salt",
            "3 tsp black pepper",
            "1 cup brown sugar",
            "3 tsp curing salt"
        ],
        "instructions": [
            "Rub pork belly with cure mixture.",
            "Cure in fridge for 8-10 days.",
            "Rinse and smoke at low temp (~150°F) until cooked."
        ]
    },
    {
        "id": "jamaican-jerk-sauce",
        "title": "Jamaican Jerk Sauce",
        "category": "Sauces, Condiments & Brines",
        "ingredients": [
            "1/2 cup soy sauce",
            "1/4 cup apple cider vinegar",
            "2 tbsp olive oil",
            "2 tbsp brown sugar",
            "1 tbsp Worcestershire sauce",
            "1 tbsp fresh lime juice",
            "2 tsp allspice (pimento)",
            "1 tsp cinnamon, 1 tsp nutmeg, 1 tsp black pepper, 1 tsp salt, 1 tsp smoked paprika",
            "6 garlic cloves, minced",
            "1-inch piece fresh ginger, grated",
            "2-3 scotch bonnet peppers, finely chopped",
            "4 green onions, chopped",
            "1 small onion, chopped",
            "1 tbsp dried thyme (or 2 sprigs fresh)",
            "1/2 cup orange juice"
        ],
        "instructions": [
            "In a blender or food processor, combine all ingredients.",
            "Blend until smooth.",
            "Transfer to a jar and refrigerate for at least 2 hours to let flavors meld.",
            "Use as a marinade or dipping sauce."
        ]
    }
];