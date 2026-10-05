document.addEventListener("DOMContentLoaded", function() {

    const ingredientButtons =
        document.querySelectorAll(".ingredient");

    const selectedText =
        document.getElementById("selectedText");

    const mealType =
        document.getElementById("mealType");

    const generateBtn =
        document.getElementById("generateBtn");

    const startBtn =
        document.getElementById("startBtn");

    const resultSection =
        document.getElementById("resultSection");

    const mealTitle =
        document.getElementById("mealTitle");

    const mealDescription =
        document.getElementById("mealDescription");

    const cookTime =
        document.getElementById("cookTime");

    const difficulty =
        document.getElementById("difficulty");

    const resultType =
        document.getElementById("resultType");

    const recipeIngredients =
        document.getElementById("recipeIngredients");

    const recipeSteps =
        document.getElementById("recipeSteps");

    const favoriteBtn =
        document.getElementById("favoriteBtn");

    const favoritesBtn =
        document.getElementById("favoritesBtn");

    const favoritesModal =
        document.getElementById("favoritesModal");

    const closeFavorites =
        document.getElementById("closeFavorites");

    const favoritesList =
        document.getElementById("favoritesList");

    const newMealBtn =
        document.getElementById("newMealBtn");

    const themeBtn =
        document.getElementById("themeBtn");

    const toast =
        document.getElementById("toast");


    let selectedIngredients = [];
    let currentMeal = null;
    let toastTimer = null;


    /* TOAST */

    function showToast(message) {

        clearTimeout(toastTimer);

        toast.textContent = message;

        toast.classList.add("show");

        toastTimer = setTimeout(function() {
            toast.classList.remove("show");
        }, 2200);
    }


    /* START */

    startBtn.addEventListener("click", function() {

        document.getElementById("planner")
            .scrollIntoView({
                behavior: "smooth"
            });

    });


    /* INGREDIENT SELECT */

    ingredientButtons.forEach(function(button) {

        button.addEventListener("click", function() {

            const name =
                button.dataset.name;


            if (
                selectedIngredients.includes(name)
            ) {

                selectedIngredients =
                    selectedIngredients.filter(
                        function(item) {
                            return item !== name;
                        }
                    );

                button.classList.remove("selected");

            } else {

                selectedIngredients.push(name);

                button.classList.add("selected");

            }


            updateSelectedText();

        });

    });


    function updateSelectedText() {

        if (selectedIngredients.length === 0) {

            selectedText.textContent =
                "No ingredients selected";

            return;
        }


        selectedText.textContent =
            selectedIngredients.join(", ");

    }


    /* GENERATE */

    generateBtn.addEventListener("click", function() {

        if (selectedIngredients.length === 0) {

            showToast(
                "Select at least one ingredient."
            );

            return;
        }


        if (!mealType.value) {

            showToast(
                "Please choose meal type."
            );

            mealType.focus();

            return;
        }


        currentMeal =
            findMeal(
                selectedIngredients,
                mealType.value
            );


        displayMeal(currentMeal);

        resultSection.classList.remove("hidden");

        resultSection.scrollIntoView({
            behavior: "smooth"
        });

        showToast("Meal found! 🍽️");

    });


    /* MEAL ENGINE */

    function findMeal(ingredients, type) {

        const has = function(name) {
            return ingredients.includes(name);
        };


        /* EGG + BREAD */

        if (
            has("Egg") &&
            has("Bread")
        ) {

            return {
                title: "Egg Toast",
                description: "A quick and simple breakfast made with crispy bread and seasoned egg.",
                time: "10 min",
                difficulty: "Easy",
                type: type,
                ingredients: [
                    "2 Bread slices",
                    "2 Eggs",
                    "1 Onion",
                    "Salt",
                    "Pepper",
                    "1 tsp Oil"
                ],
                steps: [
                    "Beat the eggs with salt and pepper.",
                    "Heat a pan and add a little oil.",
                    "Dip bread into the egg mixture.",
                    "Cook both sides until golden.",
                    "Serve hot."
                ]
            };

        }


        /* RICE + EGG */

        if (
            has("Rice") &&
            has("Egg")
        ) {

            return {
                title: "Egg Fried Rice",
                description: "A quick fried rice using cooked rice, egg and vegetables.",
                time: "20 min",
                difficulty: "Easy",
                type: type,
                ingredients: [
                    "2 cups cooked rice",
                    "2 Eggs",
                    "1 Onion",
                    "Vegetables",
                    "Salt",
                    "Oil"
                ],
                steps: [
                    "Heat oil in a pan.",
                    "Add onion and vegetables.",
                    "Add beaten eggs and scramble.",
                    "Add cooked rice and mix.",
                    "Season with salt and serve."
                ]
            };

        }


        /* CHICKEN */

        if (
            has("Chicken") &&
            has("Tomato") &&
            has("Onion")
        ) {

            return {
                title: "Simple Chicken Curry",
                description: "A comforting chicken curry prepared with tomato and onion.",
                time: "40 min",
                difficulty: "Medium",
                type: type,
                ingredients: [
                    "Chicken",
                    "Tomato",
                    "Onion",
                    "Ginger garlic paste",
                    "Spices",
                    "Salt",
                    "Oil"
                ],
                steps: [
                    "Heat oil and sauté onion.",
                    "Add ginger garlic paste.",
                    "Add tomato and cook until soft.",
                    "Add chicken and spices.",
                    "Cover and cook thoroughly.",
                    "Serve with rice or bread."
                ]
            };

        }


        /* PANEER */

        if (
            has("Paneer") &&
            has("Tomato")
        ) {

            return {
                title: "Quick Paneer Masala",
                description: "A simple paneer dish with a rich tomato base.",
                time: "25 min",
                difficulty: "Easy",
                type: type,
                ingredients: [
                    "Paneer",
                    "Tomato",
                    "Onion",
                    "Spices",
                    "Salt",
                    "Oil"
                ],
                steps: [
                    "Cut paneer into small cubes.",
                    "Cook onion until soft.",
                    "Add tomato and spices.",
                    "Add paneer cubes.",
                    "Cook for a few minutes.",
                    "Serve hot."
                ]
            };

        }


        /* POTATO */

        if (
            has("Potato") &&
            has("Onion")
        ) {

            return {
                title: "Spiced Potato Fry",
                description: "Crispy and flavorful potato fry that works as a side dish or snack.",
                time: "25 min",
                difficulty: "Easy",
                type: type,
                ingredients: [
                    "Potatoes",
                    "Onion",
                    "Chilli powder",
                    "Turmeric",
                    "Salt",
                    "Oil"
                ],
                steps: [
                    "Cut potatoes into small pieces.",
                    "Heat oil in a pan.",
                    "Add onion and cook.",
                    "Add potatoes and spices.",
                    "Cook until potatoes become crispy.",
                    "Serve hot."
                ]
            };

        }


        /* CHEESE + BREAD */

        if (
            has("Cheese") &&
            has("Bread")
        ) {

            return {
                title: "Cheese Toast",
                description: "A quick cheesy snack that takes only a few minutes.",
                time: "10 min",
                difficulty: "Easy",
                type: type,
                ingredients: [
                    "Bread",
                    "Cheese",
                    "Butter",
                    "Pepper"
                ],
                steps: [
                    "Spread butter on bread.",
                    "Add cheese on top.",
                    "Sprinkle pepper.",
                    "Toast until cheese melts.",
                    "Serve immediately."
                ]
            };

        }


        /* VEGETABLES */

        if (
            has("Vegetables") ||
            has("Tomato") ||
            has("Onion")
        ) {

            return {
                title: "Mixed Vegetable Bowl",
                description: "A healthy vegetable meal using the ingredients you selected.",
                time: "20 min",
                difficulty: "Easy",
                type: type,
                ingredients: [
                    "Mixed vegetables",
                    "Tomato",
                    "Onion",
                    "Salt",
                    "Pepper",
                    "Oil"
                ],
                steps: [
                    "Wash and cut the vegetables.",
                    "Heat a little oil.",
                    "Add onion and vegetables.",
                    "Season with salt and pepper.",
                    "Cook until tender.",
                    "Serve warm."
                ]
            };

        }


        /* DEFAULT */

        return {
            title: "Quick Kitchen Bowl",
            description: "A simple meal suggestion based on the ingredients you selected.",
            time: "20 min",
            difficulty: "Easy",
            type: type,
            ingredients: [
                ...ingredients,
                "Salt",
                "Pepper",
                "Oil"
            ],
            steps: [
                "Prepare and cut your selected ingredients.",
                "Heat a pan with a little oil.",
                "Add the ingredients and cook.",
                "Season according to taste.",
                "Cook until ready and serve."
            ]
        };

    }


    /* DISPLAY */

    function displayMeal(meal) {

        mealTitle.textContent =
            meal.title;

        mealDescription.textContent =
            meal.description;

        cookTime.textContent =
            meal.time;

        difficulty.textContent =
            meal.difficulty;

        resultType.textContent =
            meal.type;


        recipeIngredients.innerHTML = "";

        meal.ingredients.forEach(
            function(item) {

                const li =
                    document.createElement("li");

                li.textContent = item;

                recipeIngredients.appendChild(li);

            }
        );


        recipeSteps.innerHTML = "";

        meal.steps.forEach(
            function(step) {

                const li =
                    document.createElement("li");

                li.textContent = step;

                recipeSteps.appendChild(li);

            }
        );


        favoriteBtn.classList.remove("active");

        favoriteBtn.textContent = "♡";

    }


    /* FAVORITE */

    favoriteBtn.addEventListener("click", function() {

        if (!currentMeal) return;


        let favorites =
            JSON.parse(
                localStorage.getItem(
                    "mealMateFavorites"
                ) || "[]"
            );


        const exists =
            favorites.some(function(meal) {

                return meal.title === currentMeal.title;

            });


        if (exists) {

            showToast("Already in favorites ❤️");

            return;
        }


        favorites.push(currentMeal);


        localStorage.setItem(
            "mealMateFavorites",
            JSON.stringify(favorites)
        );


        favoriteBtn.classList.add("active");

        favoriteBtn.textContent = "♥";

        showToast("Meal added to favorites!");

    });


    /* FAVORITES MODAL */

    favoritesBtn.addEventListener("click", function() {

        loadFavorites();

        favoritesModal.classList.remove("hidden");

    });


    closeFavorites.addEventListener("click", function() {

        favoritesModal.classList.add("hidden");

    });


    favoritesModal.addEventListener(
        "click",
        function(event) {

            if (event.target === favoritesModal) {

                favoritesModal.classList.add("hidden");

            }

        }
    );


    function loadFavorites() {

        const favorites =
            JSON.parse(
                localStorage.getItem(
                    "mealMateFavorites"
                ) || "[]"
            );


        favoritesList.innerHTML = "";


        if (favorites.length === 0) {

            favoritesList.innerHTML = `
                <div class="favorite-item">
                    <strong>No favorite meals yet.</strong>
                    <small>
                        Generate a meal and press ❤️.
                    </small>
                </div>
            `;

            return;
        }


        favorites.forEach(function(meal) {

            const item =
                document.createElement("div");

            item.className =
                "favorite-item";

            item.innerHTML = `
                <strong>
                    🍽️ ${escapeHTML(meal.title)}
                </strong>

                <small>
                    ${escapeHTML(meal.time)}
                    • ${escapeHTML(meal.difficulty)}
                    • ${escapeHTML(meal.type)}
                </small>
            `;

            favoritesList.appendChild(item);

        });

    }


    /* NEW MEAL */

    newMealBtn.addEventListener("click", function() {

        resultSection.classList.add("hidden");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });


    /* DARK MODE */

    const savedTheme =
        localStorage.getItem(
            "mealMateTheme"
        );


    if (savedTheme === "dark") {

        document.body.classList.add("dark");

    }


    updateThemeButton();


    themeBtn.addEventListener("click", function() {

        document.body.classList.toggle("dark");

        const dark =
            document.body.classList.contains("dark");


        localStorage.setItem(
            "mealMateTheme",
            dark ? "dark" : "light"
        );


        updateThemeButton();

    });


    function updateThemeButton() {

        themeBtn.textContent =
            document.body.classList.contains("dark") ?
            "☀️ Light" :
            "🌙 Dark";

    }


    /* SAFE HTML */

    function escapeHTML(value) {

        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }

});