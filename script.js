// JavaScript for the custom Brave homepage

// Function to determine the time of day and display an appropriate greeting.
function displayGreeting() {
    const greeting = document.getElementById('greeting');
    const currentTime = new Date();
    const currentHour = currentTime.getHours();

    if (currentHour >= 5 && currentHour < 12) {
        greeting.textContent = 'Good morning, R3TR0';
    } else if (currentHour >= 12 && currentHour < 18) {
        greeting.textContent = 'Good afternoon, R3TR0';
    } else {
        greeting.textContent = 'Good evening, R3TR0';
    }
}

// Function to update search suggestions.
function updateSearchSuggestions() {
    const searchInput = document.getElementById('search-input');
    const searchSuggestions = document.getElementById('search-suggestions');
    const query = searchInput.value.trim();
    if (query) {
        const previousSearches = JSON.parse(localStorage.getItem('previousSearches')) || [];
        const suggestions = previousSearches
            .filter(search => search.includes(query))
            .filter((value, index, self) => self.indexOf(value) === index); // Remove duplicates

        if (suggestions.length > 0) {
            searchSuggestions.style.display = 'block';
            searchSuggestions.innerHTML = suggestions.map(suggestion => {
                return `<div class="suggestion">${suggestion}</div>`;
            }).join('');
        } else {
            searchSuggestions.style.display = 'none';
        }
    } else {
        searchSuggestions.style.display = 'none';
    }
}

// Function to perform a web search using DuckDuckGo.
function performSearch() {
    const searchInput = document.getElementById('search-input');
    const query = searchInput.value.trim();
    if (query) {
        const previousSearches = JSON.parse(localStorage.getItem('previousSearches')) || [];
        // Store the search query if it's not already in the list.
        if (!previousSearches.includes(query)) {
            previousSearches.unshift(query);
            localStorage.setItem('previousSearches', JSON.stringify(previousSearches));
        }
        const searchUrl = `https://duckduckgo.com/?q=${encodeURIComponent(query)}`;
        window.open(searchUrl, '_blank');
    }
}

// Interactive background animation
const background = document.getElementById("background-animation");
background.addEventListener("mousemove", (e) => {
    const xPos = (e.clientX / window.innerWidth) * 100;
    const yPos = (e.clientY / window.innerHeight) * 100;
    background.style.backgroundPosition = `${xPos}% ${yPos}%`;
});

// Function to update and display the live clock for the UK
function updateClock() {
    const clockElement = document.getElementById('clock');
    const options = { timeZone: 'Europe/London', hour12: false, timeStyle: 'medium' };
    const currentTime = new Date().toLocaleTimeString('en-GB', options);
    clockElement.textContent = currentTime;
}

// Function to update the clock every second (1000 milliseconds)
function startClock() {
    updateClock();
    setInterval(updateClock, 1000); // Update every second
}

// Call the startClock function when the page loads
startClock();

// Display the greeting when the page loads.
displayGreeting();

// Call updateSearchSuggestions on input and handle Enter key press for search
const searchInput = document.getElementById('search-input');
searchInput.addEventListener('input', updateSearchSuggestions);
searchInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        performSearch();
    }
});

// Handle click on search suggestions
const searchSuggestions = document.getElementById('search-suggestions');
searchSuggestions.addEventListener('click', function (event) {
    if (event.target.tagName === 'DIV') {
        searchInput.value = event.target.textContent;
        performSearch();
    }
});
