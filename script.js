// Product data
const products = [
  { id: 1, name: "Cloud Runner", cat: "Running", price: 129, img: "shoe-1.jpg" },
  { id: 2, name: "Court Hi", cat: "Basketball", price: 159, img: "shoe-2.jpg" },
  { id: 3, name: "Aero Flex", cat: "Training", price: 119, img: "shoe-3.jpg" },
  { id: 4, name: "Heritage Low", cat: "Lifestyle", price: 139, img: "shoe-4.jpg" },
];

const cart = [];

// Render products
const grid = document.getElementById("productGrid");
grid.innerHTML = products.map(p => `
  <div class="product-card">
    <div class="img-wrap"><img src="${p.img}" alt="${p.name}" loading="lazy" /></div>
    <div class="product-info">
      <h3>${p.name}</h3>
      <p class="cat">${p.cat}</p>
      <div class="row">
        <span class="price">$${p.price}</span>
        <button class="add-btn" data-id="${p.id}">Add to Cart</button>
      </div>
    </div>
  </div>
`).join("");

// Cart logic
const cartBtn = document.getElementById("cartBtn");
const cartDrawer = document.getElementById("cartDrawer");
const closeCart = document.getElementById("closeCart");
const overlay = document.getElementById("overlay");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

function openCart() { cartDrawer.classList.add("open"); overlay.classList.add("show"); }
function closeCartDrawer() { cartDrawer.classList.remove("open"); overlay.classList.remove("show"); }

cartBtn.addEventListener("click", openCart);
closeCart.addEventListener("click", closeCartDrawer);
overlay.addEventListener("click", () => { closeCartDrawer(); document.getElementById("navLinks").classList.remove("open"); });

function renderCart() {
  if (cart.length === 0) {
    cartItems.innerHTML = `<p class="empty">Your cart is empty.</p>`;
  } else {
    cartItems.innerHTML = cart.map((it, idx) => `
      <div class="cart-item">
        <img src="${it.img}" alt="${it.name}" />
        <div class="info">
          <h4>${it.name}</h4>
          <p>$${it.price} × ${it.qty}</p>
        </div>
        <button data-remove="${idx}" aria-label="Remove">✕</button>
      </div>
    `).join("");
  }
  cartCount.textContent = cart.reduce((s, i) => s + i.qty, 0);
  cartTotal.textContent = "$" + cart.reduce((s, i) => s + i.price * i.qty, 0);
}

grid.addEventListener("click", (e) => {
  const btn = e.target.closest(".add-btn");
  if (!btn) return;
  const id = +btn.dataset.id;
  const product = products.find(p => p.id === id);
  const existing = cart.find(i => i.id === id);
  if (existing) existing.qty++;
  else cart.push({ ...product, qty: 1 });
  renderCart();
  openCart();
});

cartItems.addEventListener("click", (e) => {
  const idx = e.target.dataset.remove;
  if (idx !== undefined) {
    cart.splice(+idx, 1);
    renderCart();
  }
});

renderCart();

// Mobile menu
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
menuToggle.addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.addEventListener("click", (e) => {
  if (e.target.tagName === "A") navLinks.classList.remove("open");
});

// Newsletter
document.getElementById("newsletterForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const msg = document.getElementById("newsletterMsg");
  msg.textContent = "✓ Thanks! You're subscribed.";
  e.target.reset();
  setTimeout(() => msg.textContent = "", 4000);
});
