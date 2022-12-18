// https://www.themealdb.com/api/json/v1/1/filter.php?i={searchTerm}
// https://www.themealdb.com/api/json/v1/1/lookup.php?i={id}

// setup vars

let searchInputEl = document.querySelector('.search-input');
let searchBtnEl = document.querySelector('#search-btn');
let resultAreaEl = document.querySelector('.results-area');
let recipeDetails = document.querySelector('.recipe-details');

// Events
searchBtnEl.addEventListener('click', getRecipes);
resultAreaEl.addEventListener('click', getRecipeDetails);
recipeDetails.addEventListener('click', closeRecipeDetails)

function getRecipes() {
    let searchTerm = searchInputEl.value.trim();
    let apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchTerm}`;

    fetch(apiUrl)
    .then((res) => {
        if(res.ok) return res.json();
    })
    .then((data) => {
        displayRecipes(data);
    }) 
}

function displayRecipes(recipes) {
    resultAreaEl.innerHTML = "";
    if(recipes.meals == null) {
        resultAreaEl.innerHTML = "No Data";
        return;
    }

    recipes.meals.forEach( (recipe) => {
        resultAreaEl.innerHTML += `
            <div class="card">
                <div class="card-img">
                    <img src="${recipe.strMealThumb}" alt="">
                </div>
                <div class="card-info">
                    <h2>${recipe.strMeal} </h2>
                    <a href="#" class="recipe-btn" data-id=${recipe.idMeal}>Get Recipe</a>
                </div>
            </div>
        `
    })
}

function getRecipeDetails(e) {
    if(e.target.classList.contains('recipe-btn')) {
        let id = e.target.getAttribute('data-id')
        let apiUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

        fetch(apiUrl)
            .then((res) => {
                if(res.ok) return res.json();
            })
            .then((data) => {
                displayRecipeDetails(data);
            }) 
    }
}

function displayRecipeDetails(recipeItem) {
    let item = recipeItem.meals[0];
    recipeDetails.classList.remove('showDetails');
    recipeDetails.innerHTML = "";

    recipeDetails.innerHTML = `
        <i class="fas fa-times"></i>
        <h2>${item.strMeal}</h2>
        <p>Instructions: </p>
        <p>${item.strInstructions}</p>

        <a href="${item.strYoutube}">Watch Video</a>
    `
}

function closeRecipeDetails(e) {
    if(e.target.classList.contains('fa-times')) {
        e.target.parentElement.classList.add('showDetails');
    }
}