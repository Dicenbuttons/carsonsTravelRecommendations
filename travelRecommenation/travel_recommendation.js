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
                recommendations = recommendations.concat(data.beaches);
            } else if (keyword === 'temple') {
                recommendations = recommendations.concat(data.temples);
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