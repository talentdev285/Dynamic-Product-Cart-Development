import { productsData } from "./product.js";
import {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
  calculateTotal,
  cartItems,
} from "./cart.js";

const displayCartItems = () => {
  const cartItemsContainer = document.getElementById("cart-items");
  cartItemsContainer.innerHTML = "";

  cartItems.forEach((item) => {
    const product = item.product;
    const quantity = item.quantity;
    const itemPrice = product.price;
    const discount = product.discount || 0; // Get the discount value or default to 0
    const discountedPrice = itemPrice - itemPrice * discount; // Calculate the discounted price

    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
      <p>${product.name} x ${quantity}</p>
      <p>Price: $${discountedPrice.toFixed(2)}</p>
      <p>Discount: ${
        discount * 100
      }%</p> <!-- Display the discount percentage -->
      <p>Total: $${(discountedPrice * quantity).toFixed(2)}</p>
      <button class="increase-quantity">+</button>
      <button class="decrease-quantity">-</button>
      <button class="remove-item">Remove</button>
    `;

    const increaseButton = cartItem.querySelector(".increase-quantity");
    increaseButton.addEventListener("click", () => {
      increaseQuantity(product.id);
      updateCartItems();
    });

    const decreaseButton = cartItem.querySelector(".decrease-quantity");
    decreaseButton.addEventListener("click", () => {
      decreaseQuantity(product.id);
      updateCartItems();
    });

    const removeButton = cartItem.querySelector(".remove-item");
    removeButton.addEventListener("click", () => {
      removeItem(product.id);
      updateCartItems();
    });

    cartItemsContainer.appendChild(cartItem);
  });
};

const updateCartItems = () => {
  displayCartItems();
  const totalElement = document.getElementById("total");
  totalElement.innerText = `Total: $${calculateTotal().toFixed(2)}`;
};

window.addEventListener("DOMContentLoaded", () => {
  const productItemsContainer = document.querySelector(".products");

  productsData.forEach((product) => {
    const addToCartButton = document.createElement("button");
    addToCartButton.textContent = product.button;

    addToCartButton.addEventListener("click", () => {
      const quantity = parseInt(prompt("Enter the quantity:", "1"));
      if (!isNaN(quantity) && quantity > 0) {
        addToCart(product, quantity);
        updateCartItems();
      } else {
        alert("Invalid quantity!");
      }
    });

    // update with discount offer //
    const productItem = document.createElement("div");
    productItem.classList.add("product-item");
    productItem.innerHTML = `
    <img src="${product.image}" alt="${product.name}" />
    <h3>${product.name}</h3>
    <p>Price: $${product.price.toFixed(2)}</p>
    ${product.discount ? `<p>Discount: ${product.discount * 100}%</p>` : ""}
    <p>${product.description}</p>
  `;

    productItem.appendChild(addToCartButton);
    productItemsContainer.appendChild(productItem);
  });

  const clearCartButton = document.getElementById("clear-cart");
  clearCartButton.addEventListener("click", () => {
    cartItems.length = 0;
    updateCartItems();
  });

  updateCartItems();
});
