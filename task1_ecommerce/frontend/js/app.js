const API_URL = 'http://localhost:3000/api';

// State Management
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let user = JSON.parse(localStorage.getItem('user')) || null;
let token = localStorage.getItem('token') || null;

// Auth Helper
function updateAuthUI() {
    const navLinks = document.getElementById('nav-links');
    if (navLinks) {
        if (user) {
            navLinks.innerHTML = `
                <a href="index.html">Home</a>
                <a href="cart.html">Cart (<span id="cart-count">${cart.length}</span>)</a>
                <span style="margin-left: 1.5rem; color: #475569;">Hi, ${user.username}</span>
                <a href="#" onclick="logout()">Logout</a>
            `;
        } else {
            navLinks.innerHTML = `
                <a href="index.html">Home</a>
                <a href="cart.html">Cart (<span id="cart-count">${cart.length}</span>)</a>
                <a href="login.html">Login</a>
                <a href="register.html">Register</a>
            `;
        }
    }
}

function logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    user = null;
    token = null;
    window.location.href = 'index.html';
}

// Cart Helper
function addToCart(product) {
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateAuthUI();
    alert('Added to cart!');
}

// Fetch Products
async function fetchProducts() {
    try {
        const response = await fetch(`${API_URL}/products`);
        const products = await response.json();
        return products;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

// Render Products (for index.html)
async function renderProducts() {
    const productList = document.getElementById('product-list');
    if (!productList) return;

    const products = await fetchProducts();

    if (products.length === 0) {
        productList.innerHTML = '<p class="text-center">No products found.</p>';
        return;
    }

    productList.innerHTML = products.map(product => `
        <div class="card">
            <img src="${product.imageUrl || 'https://via.placeholder.com/300'}" alt="${product.name}" class="card-img">
            <div class="card-body">
                <h3 class="card-title">${product.name}</h3>
                <p class="card-text">${product.description ? product.description.substring(0, 60) + '...' : ''}</p>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span class="card-price">$${product.price}</span>
                    <a href="product.html?id=${product.id}" class="btn">View Details</a>
                </div>
            </div>
        </div>
    `).join('');
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateAuthUI();

    // Check which page we are on
    if (document.getElementById('product-list')) {
        renderProducts();
    }
});
