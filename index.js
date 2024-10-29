import { Product } from "./product.js";
import { ShoppingCart } from "./shoppingcart.js";
import { Inventory } from "./inventory.js";

const inventory = new Inventory();

//Tooted
const product1 = new Product("SÄRK", 19.99, 11);
const product2 = new Product("PÜKSID", 22.5, 3);
const product3 = new Product("SOKID", 10.0, 20);

inventory.addProduct(product1, product1.quantity);
inventory.addProduct(product2, product2.quantity);
inventory.addProduct(product3, product3.quantity);

//Ostukorv
const cart = new ShoppingCart();

// Lisamine ostukorvi ja kuvamine
function addToCart(product, quantity) {
  // Inventory vaatamine ja korvi lisamine
  if (inventory.reduceStock(product.name, quantity)) {
    cart.addItem(product, quantity);
    displayCart();
    displayProducts();
  } else {
    alert(`${product.name} on laost otsas.`);
  }
}

// Telli juurde
function orderMore(productName) {
  inventory.addProduct(new Product(productName, 0, 10), 10);
  alert(`${productName} (10tk) on lisatud lattu.`);
  displayProducts();
}

// Toodete kuvamine lehel
function displayProducts() {
  const productsDiv = document.getElementById("products");

  const heading = productsDiv.querySelector("h2");
  productsDiv.innerHTML = "";
  productsDiv.appendChild(heading);

  const products = [product1, product2, product3];

  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");

    const productInfoContainer = document.createElement("div");
    const productName = document.createElement("p");
    productName.textContent = product.name;

    const productPrice = document.createElement("p");
    productPrice.textContent = `Hind: ${product.price}€`;

    const productQuantity = document.createElement("p");
    const currentStock = inventory.checkStore(product.name);
    productQuantity.textContent = `Kogus: ${currentStock}tk`;

    productInfoContainer.appendChild(productName);
    productInfoContainer.appendChild(productPrice);
    productInfoContainer.appendChild(productQuantity);

    // Lisa ostukorvi nupp
    const addButton = document.createElement("button");
    addButton.textContent = "Lisa ostukorvi";
    addButton.onclick = () => addToCart(product, 1);

    productDiv.appendChild(productInfoContainer);
    productDiv.appendChild(addButton);

    // Telli juurde nupp, kui otsas
    if (currentStock === 0) {
      const orderMoreButton = document.createElement("button");
      orderMoreButton.textContent = "Telli juurde";
      orderMoreButton.onclick = () => orderMore(product.name);
      productDiv.appendChild(orderMoreButton);
    }

    productsDiv.appendChild(productDiv);
  });
}

// Ostukorvi sisu
function displayCart() {
  const cartItemsDiv = document.getElementById("cart-items");
  const cartTotalDiv = document.getElementById("cart-total");

  cartItemsDiv.innerHTML = "";
  cart.items.forEach((item) => {
    const cartItem = document.createElement("li");

    const productName = document.createElement("span");
    productName.textContent = item.product.name;

    const quantityText = document.createElement("span");
    quantityText.textContent = ` (Kogus: ${item.quantity})`;

    const priceText = document.createElement("span");
    priceText.textContent = ` - ${(item.product.price * item.quantity).toFixed(
      2
    )}€`;

    cartItem.appendChild(productName);
    cartItem.appendChild(quantityText);
    cartItem.appendChild(priceText);

    cartItemsDiv.appendChild(cartItem);
  });

  cartTotalDiv.textContent = `Kogusumma: ${cart.getTotal()}€`;
}

// Tühjenda ostukorv
document.getElementById("empty-cart-btn").onclick = () => {
  cart.emptyCart(inventory);
  displayCart();
  displayProducts();
};

displayProducts();
displayCart();
