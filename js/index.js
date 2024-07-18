
// Function to fetch pet data from the JSON file
async function fetchPets() {
  try {
      // Fetch the JSON data from the pets.json file
      const response = await fetch('https://my-json-server.typicode.com/nikitaamani/FURRY-FRIENDS/pets');

      // Check if the request was successful
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }

      // Parse the JSON data
      const pets = await response.json();

      // Get the container where the pet cards will be displayed
      const petsContainer = document.getElementById('pets-container');

      // Function to render pet cards
      const renderPets = (pets) => {
          // Clear any existing content in the container
          petsContainer.innerHTML = '';

          // Iterate over the pets data and create the pet cards
          pets.forEach(pet => {
              const card = document.createElement('div');
              card.className = 'pet-card';
              card.innerHTML = `
                  <img src="${pet.photo.full}" alt="${pet.name}">
                  <div class="content">
                      <h3>${pet.name}</h3>
                      <p class="description">${pet.weight} Kg</p>
                      <button class="adopt-button">Adopt Me</button>
                  </div>
              `;

              // Add event listener for the "Adopt Me" button
              const adoptButton = card.querySelector('.adopt-button');
              adoptButton.addEventListener('click', () => {
                  // Change the button text to "Adopted" and disable the button
                  adoptButton.textContent = 'Adopted';
                  adoptButton.disabled = true;
                  adoptButton.classList.add('adopted');
              });

              petsContainer.appendChild(card);
          });
      };

      // Initially render all pets
      renderPets(pets);

      // Add event listener for the search button
      const searchButton = document.getElementById('search-button');
      searchButton.addEventListener('click', () => {
          const searchQuery = document.getElementById('search-input').value.toLowerCase();
          const filteredPets = pets.filter(pet =>
              pet.name.toLowerCase().includes(searchQuery)
          );
          renderPets(filteredPets);
      });

      // Add event listener for the theme toggle button
      const themeToggle = document.getElementById('theme-toggle');
      themeToggle.addEventListener('click', () => {
          // Toggle the data-theme attribute
          if (document.documentElement.getAttribute('data-theme') === 'dark') {
              document.documentElement.removeAttribute('data-theme');
              themeToggle.textContent = '🌙'; // Dark mode icon
          } else {
              document.documentElement.setAttribute('data-theme', 'dark');
              themeToggle.textContent = '🌞'; // Light mode icon
          }
      });

  } catch (error) {
      console.error('Error fetching pets:', error);
  }
}

// Call the fetchPets function when the DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
  fetchPets();
});