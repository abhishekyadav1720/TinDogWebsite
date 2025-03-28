// Sample data for dog cards
const dogs = [
    { id: 1, name: "Buddy", breed: "Golden Retriever", age: 3, price: "$500" },
    { id: 2, name: "Max", breed: "Labrador", age: 2, price: "$450" },
    { id: 3, name: "Bella", breed: "Beagle", age: 4, price: "$400" },
];

// Function to filter and search dogs
function filterAndSearchDogs() {
    const searchQuery = document.getElementById("search-bar").value.toLowerCase();
    const ageFilter = document.getElementById("filter-age").value;

    const filteredDogs = dogs.filter((dog) => {
        const matchesSearch =
            dog.name.toLowerCase().includes(searchQuery) ||
            dog.breed.toLowerCase().includes(searchQuery);

        const matchesAge =
            !ageFilter || (ageFilter === "4" ? dog.age >= 4 : dog.age == ageFilter);

        return matchesSearch && matchesAge;
    });

    renderDogCards(filteredDogs);
}

// Function to render dog cards
function renderDogCards(filteredDogs = dogs) {
    const container = document.getElementById("dog-cards-container");
    container.innerHTML = ""; // Clear existing cards

    filteredDogs.forEach((dog) => {
        const card = document.createElement("div");
        card.className = "dog-card";

        card.innerHTML = `
            <div class="dog-info">
                <h3>${dog.name}</h3>
                <p class="details hidden">Breed: ${dog.breed}<br>Age: ${dog.age}<br>Price: ${dog.price}</p>
            </div>
            <button class="like-btn" data-id="${dog.id}">
                <span class="heart-icon">❤️</span>
            </button>
        `;

        // Add hover effect to show details
        card.addEventListener("mouseenter", () => {
            card.querySelector(".details").classList.remove("hidden");
        });
        card.addEventListener("mouseleave", () => {
            card.querySelector(".details").classList.add("hidden");
        });

        // Add like button functionality
        card.querySelector(".like-btn").addEventListener("click", (e) => {
            const dogId = e.target.closest(".like-btn").dataset.id;
            toggleFavoriteDog(dogId);
        });

        container.appendChild(card);
    });
}

// Function to toggle favorite dogs in localStorage
function toggleFavoriteDog(dogId) {
    let favorites = JSON.parse(localStorage.getItem("favoriteDogs")) || [];
    if (favorites.includes(dogId)) {
        favorites = favorites.filter((id) => id !== dogId); // Remove from favorites
    } else {
        favorites.push(dogId); // Add to favorites
    }
    localStorage.setItem("favoriteDogs", JSON.stringify(favorites));
    alert(`Favorites updated: ${favorites.join(", ")}`);
}

// Add event listeners for search and filter
document.getElementById("search-bar").addEventListener("input", filterAndSearchDogs);
document.getElementById("filter-age").addEventListener("change", filterAndSearchDogs);

// Initial render
document.addEventListener("DOMContentLoaded", () => {
    renderDogCards();
});