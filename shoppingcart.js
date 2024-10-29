import { Product } from "./product.js";
import { Inventory } from "./inventory.js";

export class ShoppingCart {
  constructor() {
    this.items = [];
  }

  // Lisa toode korvi
  addItem(product, quantity) {
    const itemInCart = this.items.find(
      (item) => item.product.name === product.name
    );
    if (itemInCart) {
      itemInCart.quantity += quantity;
    } else {
      this.items.push({ product, quantity });
    }
  }

  // Korvi lisatud toote uuendamine
  updateItemQuantity(productName, newQuantity) {
    const existingItem = this.items.find(
      (item) => item.product.name === productName
    );
    if (existingItem) {
      if (newQuantity <= 0) {
        this.removeItem(productName);
      } else {
        existingItem.quantity = newQuantity;
      }
    }
  }

  // Eemalda ese ostukorvist
  removeItem(productName) {
    this.items = this.items.filter((item) => item.product.name !== productName);
  }

  // Kogusumma
  getTotal() {
    return this.items
      .reduce((total, item) => {
        return total + item.product.price * item.quantity;
      }, 0)
      .toFixed(2);
  }

  // Tooted ostukorvis
  listItems() {
    return this.items
      .map((item) => {
        return `${item.product.name} (Kogus: ${item.quantity})`;
      })
      .join(", ");
  }

  // Ostukorvi tühjendamine ja lattu lisamine
  emptyCart(inventory) {
    this.items.forEach((item) => {
      inventory.addProduct(item.product, item.quantity);
    });
    this.items = [];
  }
}
