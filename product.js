export class Product {
  constructor(name, price, quantity) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
  }

  getInfo() {
    return `Toode: ${this.name}, Hind: ${this.price}€, Kogus: ${this.quantity}`;
  }
}
