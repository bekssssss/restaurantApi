const urlFood = 'https://www.themealdb.com/api/json/v2/1/randomselection.php';
const mealContainer = document.getElementById('mealContainer');
const mealForm = document.getElementById('meal-form');
const mealInput = document.getElementById('meal-input');
const resetButton = document.getElementById('reset-button');

function fetchRandomMeals() {
    fetch(urlFood)
        .then(response => response.json())
        .then(data => {
            displayMeals(data.meals);
        })
        .catch(error => {
            console.error('Error fetching data', error);
        });
}

fetch(urlFood)
    .then(response => response.json())
    .then(data => {
        const meals = data.meals;
        displayMeals(meals);
    })
    .catch(error => {
        console.error('error fetching data', error);
    });

mealForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const mealName = mealInput.value.trim();
    if (mealName) {
        searchMealByName(mealName);
    }
});

resetButton.addEventListener('click', function () {
    mealInput.value = '';
    mealContainer.innerHTML = '';
    fetchRandomMeals();
});

function searchMealByName(mealName) {
    const searchMealUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`;
    fetch(searchMealUrl)
        .then(response => response.json())
        .then(data => {
            mealContainer.innerHTML = '';
            if (data.meals) {
                displayMeals(data.meals);
            } else {
                mealContainer.innerHTML = '<p class="false-result">We didn\'t yet add this food</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching data', error);
        });
}

function displayMeals(meals) {
    meals.forEach(meal => {
        const mealDiv = document.createElement('div');
        mealDiv.classList.add('meal');
        let ingredients = '';
        for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`];
            const measure = meal[`strMeasure${i}`];
            if (ingredient && ingredient.trim()) {
                ingredients += `<li>${measure} ${ingredient}</li>`;
            }
        }

        mealDiv.innerHTML = `
            <div class="blocks">
                <div class="block">
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                    <div class="title-img">
                        <h2>${meal.strMeal}</h2>
                        <ul>${ingredients}</ul>
                    </div>
                </div>
            </div>
        `;
        mealContainer.appendChild(mealDiv);
    });
}

fetchRandomMeals();
