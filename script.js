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
