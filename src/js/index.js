const getMealButton = document.getElementById('get-recipe');
const recipeContainer = document.getElementById('recipe');
const mainContainer = document.querySelector('.container');

const observer = new MutationObserver(() => {
  console.log('mutation observer callback');
  const offset = recipeContainer.offsetTop;
  window.scrollTo(0, offset);
});

observer.observe(recipeContainer, {subtree: true, childList: true});

getMealButton.addEventListener("click", () => {
  fetch('https://www.themealdb.com/api/json/v1/1/random.php')
  .then(res => res.json())
  .then(res => formatMeal(res.meals[0]));
  console.log('button clicked!');

  mainContainer.classList.remove('container--no-recipe');
});

function formatMeal(data) {
  const ingredients = [];

  let count = 1;
  while (data[`strIngredient${count}`])  {
    const ingredient = {
      'name': data[`strIngredient${count}`],
      'measure': data[`strMeasure${count}`]
    };
    if (ingredient) {
      ingredients.push(ingredient);
      count++;
    } else {
      break;
    }
  }

  const ingredientsList = buildIngredientsHTML(ingredients);

  recipeContainer.innerHTML = `
    <div class="recipe-title">
      ${data.strMeal}
    </div>
    <div class="recipe-container">
      <img src=${data.strMealThumb} class="recipe-img">
      <div class="recipe-ingredients">
        Ingredients
        ${ingredientsList}
      </div>
    </div>
    <div class="recipe-directions">
      ${data.strInstructions}
    </div>
  `;
}

function buildIngredientsHTML(ingredients) {
  let ingredientsList = "";

  ingredients.forEach(ingredient => {
    ingredientsList = ingredientsList + `<li>${ingredient['name']} (${ingredient['measure']})</li>`
  });

  return `<ul>${ingredientsList}</ul>`;
}