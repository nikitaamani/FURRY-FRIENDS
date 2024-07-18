//Fetching data that i will use to display on the page
const baseUrl = 'http://localhost:3000';

document.addEventListener('DOMContentLoaded', () => {
  fetchCocktails();
  const form = document.querySelector('#search-form');
  form.addEventListener('submit' , (e) => {

    e.preventDefault()
    const input = document.querySelector('#search')
    if (input.value) {
      fetchCocktails(input.value);
    }
  });
});

 // Search movies form
 const form = document.querySelector("#search-form");
 form.addEventListener("submit", (e) => {
   e.preventDefault(); // Prevent form submission
   const searchTerm = document
     .querySelector("#search")
     .value.trim()
     .toLowerCase();
   fetchMovies(searchTerm);
 });

function fetchCocktails(searchResult = '') {
  fetch(`${baseUrl}/pets`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((pets) => {
     
      document.querySelector('#cocktail').innerHTML = '';
      
      if (searchResult) {
       


         pets
            .filter((pets) =>
            pets.title.toLowerCase()
                  .includes(searchResult.toLowerCase())
            )
     .forEach((cocktails) => renderCocktails(cocktails));
    } else {
        pets.forEach((pets) => renderCocktails(pets));
      }
    })   
    .catch((err) => console.log(err));
}
//Function to call the data from the API
function renderCocktails(pets) {
  const cocktailContainer = document.querySelector('#cocktail');
  const cocktailList = document.createElement('div');
  cocktailList.classList.add('card')

  const image = document.createElement('img');
  image.classList.add('card-img-top', 'mt-2');
  image.height = 200;
  image.src = pets.photo.full;
  // image.alt = cocktails.strDrink;
  image.style.display = 'block';
  image.style.unicodeBidi = 'isolate';

  cocktailList.appendChild(image);

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');

  const title = document.createElement('h5');
  title.classList.add('card-title');
  title.textContent = pets.name;

  const description = document.createElement('p');
  description.classList.add('card-text');
  description.textContent = pets.weight;

  const button = document.createElement('button');
  button.classList.add('btn', 'btn-primary',);
  button.textContent = 'Adopt Me';

 
  
  cardBody.append(title, description, button);
  cocktailList.appendChild(cardBody);

    //Calling the function to display the data on the page
  cocktailContainer.appendChild(cocktailList);

}