const getMealButton = document.getElementById('get-meal');
const container = document.getElementById('meal');
const mainContainer = document.querySelector('.container');

getMealButton.addEventListener("click", () => {
  fetch('https://www.themealdb.com/api/json/v1/1/random.php')
  .then(res => res.json())
  .then(res => formatMeal(res.meals[0]));
  console.log('button clicked!');

  mainContainer.classList.remove('container--no-meal');
  
});

function formatMeal(data) {
  console.log(data);
  console.log(data.strMeal);
  const ingredients = [];

  let count = 1;
  while (data[`strIngredient${count}`])  {
    const ingredient = {
      'ingredient': data[`strIngredient${count}`],
      'measure': data[`strMeasure${count}`]
    };
    console.log(ingredient);
    if (ingredient) {
      ingredients.push(ingredient);
      count++;
    } else {
      break;
    }
  }

  console.log(ingredients);

  container.innerHTML = `
    <div class="recipe-title text">
      ${data.strMeal}
    </div>
    <div class="recipe-container">
      <img src=${data.strMealThumb} class="recipe-img">
      <div class="recipe-ingredients">
        Ingredients
      </div>
    </div>
    <div class="recipe-directions">
      ${data.strInstructions}
    </div>
  `;
}