// Famara'smarket Shopping Cart

let cart = [];

// Add product to cart
function addToCart(name, price) {
  const existingProduct = cart.find(
    product => product.name === name
  );

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({
      name: name,
      price: price,
      quantity: 1
    });
  }

  updateCart();
  showCartMessage(name);
}


// Update cart count and total
function updateCart() {
  const cartCount = document.getElementById("cart-count");
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  const totalQuantity = cart.reduce(
    (total, product) => total + product.quantity,
    0
  );

  const totalPrice = cart.reduce(
    (total, product) =>
      total + product.price * product.quantity,
    0
  );

  if (cartCount) {
    cartCount.textContent = totalQuantity;
  }

  if (cartItems) {
    if (cart.length === 0) {
      cartItems.innerHTML = "Your cart is empty.";
    } else {
      cartItems.innerHTML = cart
        .map(
          product => `
            <div class="cart-item">
              <strong>${product.name}</strong>
              <p>
                Le ${product.price} × ${product.quantity}
              </p>
              <button
                type="button"
                onclick="removeFromCart('${product.name}')"
              >
                Remove
              </button>
            </div>
          `
        )
        .join("");
    }
  }

  if (cartTotal) {
    cartTotal.textContent = `Total: Le ${totalPrice}`;
  }
}


// Remove product from cart
function removeFromCart(name) {
  cart = cart.filter(
    product => product.name !== name
  );

  updateCart();
}


// Show cart section
function showCart() {
  const cartMessage =
    document.getElementById("cart-message");

  if (cartMessage) {
    cartMessage.scrollIntoView({
      behavior: "smooth"
    });
  }

  updateCart();
}


// Show confirmation message
function showCartMessage(name) {
  alert(`${name} has been added to your cart!`);
}


// Search and category filtering
function filterProducts() {
  const searchInput =
    document.getElementById("product-search");

  const categoryFilter =
    document.getElementById("category-filter");

  const products =
    document.querySelectorAll(".product-card");

  const searchText =
    searchInput
      ? searchInput.value.toLowerCase()
      : "";

  const selectedCategory =
    categoryFilter
      ? categoryFilter.value
      : "all";

  products.forEach(product => {
    const name =
      product.dataset.name.toLowerCase();

    const category =
      product.dataset.category;

    const matchesSearch =
      name.includes(searchText);

    const matchesCategory =
      selectedCategory === "all" ||
      category === selectedCategory;

    product.style.display =
      matchesSearch && matchesCategory
        ? ""
        : "none";
  });
}


// Start cart
updateCart();
