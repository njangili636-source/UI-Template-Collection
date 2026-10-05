// ===============================
// NOVA STORE - SCRIPT.JS
// ===============================

// ---------- PRODUCTS ----------
const products = [{
        id: 1,
        name: "Nova Wireless Headphones",
        category: "electronics",
        price: 2499,
        rating: 4.8,
        icon: "🎧"
    },
    {
        id: 2,
        name: "Smart Watch Pro",
        category: "electronics",
        price: 3999,
        rating: 4.7,
        icon: "⌚"
    },
    {
        id: 3,
        name: "Ultra Phone X",
        category: "electronics",
        price: 24999,
        rating: 4.9,
        icon: "📱"
    },
    {
        id: 4,
        name: "Urban Sneakers",
        category: "fashion",
        price: 2999,
        rating: 4.6,
        icon: "👟"
    },
    {
        id: 5,
        name: "Classic Hoodie",
        category: "fashion",
        price: 1599,
        rating: 4.5,
        icon: "👕"
    },
    {
        id: 6,
        name: "Minimal Backpack",
        category: "fashion",
        price: 1899,
        rating: 4.6,
        icon: "🎒"
    },
    {
        id: 7,
        name: "Smart Desk Lamp",
        category: "home",
        price: 1299,
        rating: 4.4,
        icon: "💡"
    },
    {
        id: 8,
        name: "Cozy Coffee Set",
        category: "home",
        price: 999,
        rating: 4.3,
        icon: "☕"
    },
    {
        id: 9,
        name: "Aroma Diffuser",
        category: "home",
        price: 1799,
        rating: 4.7,
        icon: "🌿"
    },
    {
        id: 10,
        name: "Glow Skin Kit",
        category: "beauty",
        price: 1499,
        rating: 4.8,
        icon: "✨"
    },
    {
        id: 11,
        name: "Daily Perfume",
        category: "beauty",
        price: 2299,
        rating: 4.6,
        icon: "🌸"
    },
    {
        id: 12,
        name: "Beauty Essentials",
        category: "beauty",
        price: 1199,
        rating: 4.5,
        icon: "💄"
    }
];


// ---------- CART ----------
let cart = JSON.parse(localStorage.getItem("novaCart")) || [];


// ---------- WISHLIST ----------
let wishlist = JSON.parse(localStorage.getItem("novaWishlist")) || [];


// ---------- DOM ----------
const productGrid = document.getElementById("productGrid");
const noProducts = document.getElementById("noProducts");
const resultText = document.getElementById("resultText");

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

const cartBtn = document.getElementById("cartBtn");
const cartCount = document.getElementById("cartCount");

const wishlistBtn = document.getElementById("wishlistBtn");
const wishCount = document.getElementById("wishCount");

const themeBtn = document.getElementById("themeBtn");

const shopBtn = document.getElementById("shopBtn");

const sortSelect = document.getElementById("sortSelect");

const toast = document.getElementById("toast");

const productModal = document.getElementById("productModal");
const modalBody = document.getElementById("modalBody");
const closeModal = document.getElementById("closeModal");

const wishlistPanel = document.getElementById("wishlistPanel");
const wishlistItems = document.getElementById("wishlistItems");
const closeWishlist = document.getElementById("closeWishlist");


// ---------- CURRENT FILTER ----------
let currentCategory = "all";
let currentSearch = "";


// ===============================
// DISPLAY PRODUCTS
// ===============================

function displayProducts() {

    let filteredProducts = [...products];

    // Category filter
    if (currentCategory !== "all") {
        filteredProducts = filteredProducts.filter(
            product => product.category === currentCategory
        );
    }

    // Search filter
    if (currentSearch.trim() !== "") {

        filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(currentSearch.toLowerCase())
        );
    }

    // Sort
    const sortValue = sortSelect ? sortSelect.value : "default";

    if (sortValue === "low") {

        filteredProducts.sort((a, b) => a.price - b.price);

    } else if (sortValue === "high") {

        filteredProducts.sort((a, b) => b.price - a.price);

    } else if (sortValue === "rating") {

        filteredProducts.sort((a, b) => b.rating - a.rating);
    }


    // Clear grid
    productGrid.innerHTML = "";


    // No products
    if (filteredProducts.length === 0) {

        noProducts.style.display = "block";

        resultText.textContent = "No products found";

        return;
    }

    noProducts.style.display = "none";


    resultText.textContent =
        `Showing ${filteredProducts.length} product${filteredProducts.length > 1 ? "s" : ""}`;


    // Create cards
    filteredProducts.forEach(product => {

        const isLiked = wishlist.includes(product.id);

        const card = document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `
            <div class="product-image">
                <span class="product-icon">${product.icon}</span>

                <button 
                    class="wishlist-product-btn ${isLiked ? "liked" : ""}"
                    onclick="toggleWishlist(${product.id})">
                    ${isLiked ? "♥" : "♡"}
                </button>
            </div>

            <div class="product-info">

                <span class="product-category">
                    ${product.category}
                </span>

                <h3>${product.name}</h3>

                <div class="rating">
                    ⭐ ${product.rating}
                </div>

                <div class="product-bottom">

                    <strong>₹${product.price.toLocaleString("en-IN")}</strong>

                    <button 
                        class="add-btn"
                        onclick="addToCart(${product.id})">
                        Add
                    </button>

                </div>

                <button 
                    class="view-btn"
                    onclick="openProduct(${product.id})">
                    View Details
                </button>

            </div>
        `;

        productGrid.appendChild(card);
    });
}


// ===============================
// ADD TO CART
// ===============================

function addToCart(productId) {

    const product = products.find(
        product => product.id === productId
    );

    if (!product) return;


    const existingProduct = cart.find(
        item => item.id === productId
    );


    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            icon: product.icon,
            quantity: 1
        });
    }


    saveCart();

    updateCartCount();

    showToast(`${product.name} added to cart 🛒`);
}


// ===============================
// SAVE CART
// ===============================

function saveCart() {

    localStorage.setItem(
        "novaCart",
        JSON.stringify(cart)
    );
}


// ===============================
// UPDATE CART COUNT
// ===============================

function updateCartCount() {

    const totalItems = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    cartCount.textContent = totalItems;
}


// ===============================
// CART BUTTON
// ===============================

cartBtn.addEventListener("click", function() {

    saveCart();

    window.location.href = "cart.html";
});


// ===============================
// WISHLIST
// ===============================

function toggleWishlist(productId) {

    const index = wishlist.indexOf(productId);

    if (index === -1) {

        wishlist.push(productId);

        showToast("Added to wishlist ❤️");

    } else {

        wishlist.splice(index, 1);

        showToast("Removed from wishlist");
    }


    localStorage.setItem(
        "novaWishlist",
        JSON.stringify(wishlist)
    );


    updateWishlistCount();

    displayProducts();
}


// ===============================
// UPDATE WISHLIST COUNT
// ===============================

function updateWishlistCount() {

    wishCount.textContent = wishlist.length;
}


// ===============================
// WISHLIST BUTTON
// ===============================

wishlistBtn.addEventListener("click", function() {

    displayWishlist();

    wishlistPanel.classList.add("open");
});


// ===============================
// DISPLAY WISHLIST
// ===============================

function displayWishlist() {

    wishlistItems.innerHTML = "";


    if (wishlist.length === 0) {

        wishlistItems.innerHTML = `
            <div class="empty-message">
                <div style="font-size:50px;">♡</div>
                <h3>Your wishlist is empty</h3>
                <p>Add products you love.</p>
            </div>
        `;

        return;
    }


    wishlist.forEach(id => {

        const product = products.find(
            product => product.id === id
        );

        if (!product) return;


        const item = document.createElement("div");

        item.className = "wishlist-item";

        item.innerHTML = `
            <div class="wishlist-icon">
                ${product.icon}
            </div>

            <div>
                <strong>${product.name}</strong>

                <p>
                    ₹${product.price.toLocaleString("en-IN")}
                </p>

                <button onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        `;

        wishlistItems.appendChild(item);
    });
}


// ===============================
// CLOSE WISHLIST
// ===============================

closeWishlist.addEventListener("click", function() {

    wishlistPanel.classList.remove("open");
});


// ===============================
// PRODUCT MODAL
// ===============================

function openProduct(productId) {

    const product = products.find(
        product => product.id === productId
    );

    if (!product) return;


    modalBody.innerHTML = `

        <div class="modal-product">

            <div class="modal-icon">
                ${product.icon}
            </div>

            <span class="product-category">
                ${product.category}
            </span>

            <h2>${product.name}</h2>

            <div class="rating">
                ⭐ ${product.rating}
            </div>

            <h3>
                ₹${product.price.toLocaleString("en-IN")}
            </h3>

            <p>
                Discover this carefully selected product
                from Nova Store. Designed for modern
                living with quality and style.
            </p>

            <button
                class="primary-btn"
                onclick="addToCart(${product.id}); closeProductModal();">
                Add to Cart 🛒
            </button>

        </div>
    `;


    productModal.classList.add("open");
}


// ===============================
// CLOSE MODAL
// ===============================

function closeProductModal() {

    productModal.classList.remove("open");
}


closeModal.addEventListener(
    "click",
    closeProductModal
);


// Click outside modal
productModal.addEventListener("click", function(event) {

    if (event.target === productModal) {

        closeProductModal();
    }
});


// ===============================
// SEARCH
// ===============================

function performSearch() {

    currentSearch = searchInput.value;

    displayProducts();

    document
        .getElementById("productsSection")
        .scrollIntoView({
            behavior: "smooth"
        });
}


searchBtn.addEventListener(
    "click",
    performSearch
);


searchInput.addEventListener(
    "input",
    function() {

        currentSearch = searchInput.value;

        displayProducts();
    }
);


// ===============================
// SORT
// ===============================

sortSelect.addEventListener(
    "change",
    displayProducts
);


// ===============================
// CATEGORY BUTTONS
// ===============================

const categoryButtons =
    document.querySelectorAll(".category");


categoryButtons.forEach(button => {

    button.addEventListener("click", function() {

        categoryButtons.forEach(btn =>
            btn.classList.remove("active")
        );


        this.classList.add("active");


        currentCategory =
            this.dataset.category;


        displayProducts();
    });
});


// ===============================
// SHOP COLLECTION
// ===============================

shopBtn.addEventListener("click", function() {

    document
        .getElementById("productsSection")
        .scrollIntoView({
            behavior: "smooth"
        });
});


// ===============================
// DARK MODE
// ===============================

themeBtn.addEventListener("click", function() {

    document.body.classList.toggle("dark-mode");


    if (document.body.classList.contains("dark-mode")) {

        themeBtn.textContent = "☀️";

        localStorage.setItem(
            "novaTheme",
            "dark"
        );

    } else {

        themeBtn.textContent = "🌙";

        localStorage.setItem(
            "novaTheme",
            "light"
        );
    }
});


// Load saved theme
if (localStorage.getItem("novaTheme") === "dark") {

    document.body.classList.add("dark-mode");

    themeBtn.textContent = "☀️";
}


// ===============================
// TOAST
// ===============================

let toastTimer;


function showToast(message) {

    toast.textContent = message;

    toast.classList.add("show");


    clearTimeout(toastTimer);


    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 2200);
}


// ===============================
// KEYBOARD ESC
// ===============================

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {

        closeProductModal();

        wishlistPanel.classList.remove("open");
    }
});


// ===============================
// INITIAL LOAD
// ===============================

displayProducts();

updateCartCount();

updateWishlistCount();