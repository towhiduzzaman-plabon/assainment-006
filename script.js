const API_BASE = "https://openapi.programming-hero.com/api";
const categoriesEl = document.getElementById("categories");
const plantsContainer = document.getElementById("plants-container");
const cartItemsEl = document.getElementById("cart-items");
const totalPriceEl = document.getElementById("total-price");


let cart = [];

// Show loading spinner
function showLoading() {
  plantsContainer.innerHTML = `
    <div class="flex justify-center items-center col-span-3">
      <span class="loading loading-spinner loading-lg text-green-600"></span>
    </div>
  `;
}

//  Load Categories
async function loadCategories() {
  try {
    const res = await fetch(`${API_BASE}/categories`);
    const data = await res.json();
    
    // Some APIs return categories inside 'data'
    const categories = data.categories || data.data;

    categoriesEl.innerHTML = "";
    categories.forEach((cat, index) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.textContent = cat.category || cat.category_name; // handle both keys
      if (index === 0) a.classList.add("active");

      a.onclick = () => {
        // Remove active class from all
        document.querySelectorAll("#categories a").forEach(link => link.classList.remove("active"));
        a.classList.add("active");

        // Load products by category
        loadPlantsByCategory(cat.id || cat.category_id);
      };

      li.appendChild(a);
      categoriesEl.appendChild(li);
    });
  } catch (err) {
    console.error("Error loading categories:", err);
    categoriesEl.innerHTML = "<li><a>No Categories Found</a></li>";
  }
}


// Load All Plants (Default)
async function loadAllPlants() {
  showLoading();
  try {
    const res = await fetch(`${API_BASE}/plants`);
    const data = await res.json();
    const plants = data.plants || data.data;
    renderPlants(plants);
  } catch (err) {
    console.error("Error loading plants:", err);
    plantsContainer.innerHTML = "<p class='text-center text-red-500'>Failed to load plants.</p>";
  }
}

// Load Plants by Category
async function loadPlantsByCategory(id) {
  showLoading();
  try {
    const res = await fetch(`${API_BASE}/category/${id}`);
    const data = await res.json();
    const plants = data.plants || data.data;
    renderPlants(plants);
  } catch (err) {
    console.error("Error loading plants by category:", err);
    plantsContainer.innerHTML = "<p class='text-center text-red-500'>No products found for this category.</p>";
  }
}


//Render Plants

function renderPlants(plants) {
  plantsContainer.innerHTML = "";
  plants.forEach(plant => {
    const card = document.createElement("div");
    card.className = "card bg-white shadow-lg text-black rounded-xl p-6 h-full flex flex-col justify-between";

    card.innerHTML = `
      <figure class="bg-gray-100 h-20 w-36 mb-8 flex items-center justify-center rounded-md overflow-hidden">
        <img src="${plant.image}" alt="${plant.name}" class="h-full w-36 object-cover" />
      </figure>
      <h3 class="font-semibold mb-1">${plant.name}</h3>
      <p class="text-sm text-gray-600 mb-3">${plant.description.substring(0, 70)}...</p>
      <div class="flex justify-between items-center mb-4">
        <span class="bg-green-100 text-green-700 text-sm font-semibold px-3 py-1 rounded-full">${plant.category}</span>
        <span class="font-semibold text-gray-800">৳${plant.price}</span>
      </div>
      <button class="btn bg-green-700 text-white w-full rounded-full hover:bg-green-800">Add to Cart</button>
    `;
    card.querySelector("button").onclick = () => addToCart(plant);
    plantsContainer.appendChild(card);
  });
}