// Update the handleSearch function to use the updated getRecommendations
function handleSearch() {
    console.log('Search button clicked');
    const searchInput = document.querySelector('input[type="text"]').value.toLowerCase();
    let keyword = '';

    // Define keyword variations
    const keywords = {
        beach: ['beach', 'beaches'],
        temple: ['temple', 'temples'],
        country: ['country', 'countries']
    };

    // Determine the keyword based on input
    if (keywords.beach.includes(searchInput)) {
        keyword = 'beach';
    } else if (keywords.temple.includes(searchInput)) {
        keyword = 'temple';
    } else if (keywords.country.includes(searchInput)) {
        keyword = 'country';
    } else {
        alert('No recommendations found for the entered keyword.');
        return;
    }

    // Fetch and display recommendations
    getRecommendations(keyword).then(recommendations => {
        displayRecommendations(recommendations);
    });
}

// Function to get recommendations based on keyword
function getRecommendations(keyword) {
    return fetch('travel_recommendation_api.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            let recommendations = [];

            // Check the keyword and filter the appropriate category
            if (keyword === 'country') {
                data.countries.forEach(country => {
                    recommendations = recommendations.concat(country.cities);
                });
            } else if (keyword === 'beach') {
                // Assuming you have a similar structure for beaches
                data.beaches.forEach(beach => {
                    recommendations = recommendations.concat(beach.cities);
                });
            } else if (keyword === 'temple') {
                // Assuming you have a similar structure for temples
                data.temples.forEach(temple => {
                    recommendations = recommendations.concat(temple.cities);
                });
            }

            return recommendations;
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            return [];
        });
}

// Add event listener to the search button
document.querySelector('button[type="button"].search').addEventListener('click', handleSearch);

// Function to clear the input field and displayed recommendations
function resetSearch() {
    // Clear the input field
    const searchInput = document.querySelector('input[type="text"]');
    searchInput.value = '';

    // Clear the displayed recommendations
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = ''; // Clear the content of the results container
}

// Add event listener to the Reset button
document.querySelector('button[type="button"].reset').addEventListener('click', resetSearch);

// Function to display recommendations (same as before)
function displayRecommendations(recommendations) {
    // Clear previous results
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    recommendations.forEach(recommendation => {
        const container = document.createElement('div');
        const name = document.createElement('h2');
        const image = document.createElement('img');
        const description = document.createElement('p');

        name.textContent = recommendation.name;
        image.src = recommendation.imageUrl;
        description.textContent = recommendation.description;

        container.appendChild(name);
        container.appendChild(image);
        container.appendChild(description);

        resultsContainer.appendChild(container);
    });
}

// Fetch data from the JSON file
fetch('travel_recommendation_api.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log(data); // Log the data to check if it's fetched correctly
        displayRecommendations(data); // Call a function to display the recommendations
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });

// Function to display recommendations
function displayRecommendations(recommendations) {
    recommendations.forEach(recommendation => {
        // Create elements to display the recommendation details
        const container = document.createElement('div');
        const name = document.createElement('h2');
        const image = document.createElement('img');
        const description = document.createElement('p');

        // Set the content of the elements
        name.textContent = recommendation.name;
        image.src = recommendation.imageUrl; // Ensure the image file is in the correct path
        description.textContent = recommendation.description;

        // Append elements to the container
        container.appendChild(name);
        container.appendChild(image);
        container.appendChild(description);

        // Append the container to the body or a specific section of your HTML
        document.body.appendChild(container);
    });
}

// Function to clear the displayed recommendations
function clearResults() {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = ''; // Clear the content of the results container
}

// Add event listener to the clear button
document.querySelector('button[type="button"].clear').addEventListener('click', clearResults);