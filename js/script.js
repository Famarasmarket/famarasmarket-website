// Famara'smarket Shopping Cart

let cart = JSON.parse(localStorage.getItem("famaraCart")) || [];


// SAVE CART
function saveCart() {
  localStorage.setItem("famaraCart", JSON.stringify(cart));
}


// ADD TO CART
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

  saveCart();
  updateCart();

  alert(`${name} has been added to your cart!`);
}


// UPDATE CART
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
      cartItems.innerHTML = cart.map(product => `
        <div class="cart-item">
          <strong>${product.name}</strong>
          <p>Le ${product.price} × ${product.quantity}</p>

          <button
            type="button"
            onclick="removeFromCart('${product.name}')"
          >
            Remove
          </button>
        </div>
      `).join("");
    }
  }

  if (cartTotal) {
    cartTotal.textContent = `Total: Le ${totalPrice}`;
  }

  updateCheckout();
}


// REMOVE FROM CART
function removeFromCart(name) {
  cart = cart.filter(
    product => product.name !== name
  );

  saveCart();
  updateCart();
}


// SHOW CART
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


// FILTER PRODUCTS
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
      (product.dataset.name || "").toLowerCase();

    const category =
      product.dataset.category || "";

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


// UPDATE CHECKOUT
function updateCheckout() {
  const checkoutItems =
    document.getElementById("checkout-items");

  const checkoutTotal =
    document.getElementById("checkout-total");

  if (!checkoutItems) {
    return;
  }

  if (cart.length === 0) {
    checkoutItems.innerHTML =
      "Your cart is empty.";

    if (checkoutTotal) {
      checkoutTotal.textContent =
        "Total: Le 0";
    }

    return;
  }

  checkoutItems.innerHTML =
    cart.map(product => `
      <div class="checkout-item">
        <strong>${product.name}</strong>
        <p>
          Le ${product.price} × ${product.quantity}
        </p>
      </div>
    `).join("");

  const totalPrice =
    cart.reduce(
      (total, product) =>
        total + product.price * product.quantity,
      0
    );

  if (checkoutTotal) {
    checkoutTotal.textContent =
      `Total: Le ${totalPrice}`;
  }
}


// CHECKOUT → WHATSAPP
const checkoutForm =
  document.getElementById("checkout-form");

if (checkoutForm) {

  checkoutForm.addEventListener(
    "submit",
    function(event) {

      event.preventDefault();

      if (cart.length === 0) {
        alert(
          "Your cart is empty. Please add a product first."
        );
        return;
      }


      const name =
        document.getElementById(
          "customer-name"
        ).value.trim();

      const phone =
        document.getElementById(
          "customer-phone"
        ).value.trim();

      const address =
        document.getElementById(
          "customer-address"
        ).value.trim();

      const payment =
        document.getElementById(
          "payment-method"
        ).value;


      const orderItems =
        cart.map(product =>
          `• ${product.name} x${product.quantity} — Le ${product.price * product.quantity}`
        ).join("\n");


      const total =
        cart.reduce(
          (sum, product) =>
            sum +
            product.price * product.quantity,
          0
        );


      const message =
`Hello Famara'smarket! 👋

I would like to place an order.

👤 Customer:
${name}

📞 Phone:
${phone}

📍 Delivery Address:
${address}

🛍️ Order:
${orderItems}

💰 Total:
Le ${total}

💳 Payment Method:
${payment}

Thank you!`;


      const whatsappNumber =
        "23299568485";

      const whatsappURL =
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        encodeURIComponent(message);


      // Open WhatsApp
      window.open(
        whatsappURL,
        "_blank"
      );

    }
  );
}


// START CART
updateCart();
