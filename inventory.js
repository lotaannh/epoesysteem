export class Inventory {
  constructor() {
    this.stock = {};
  }

  //Lisa toode lattu
  addProduct(product, quantity) {
    if (this.stock[product.name]) {
      this.stock[product.name].quantity += quantity;
    } else {
      this.stock[product.name] = { product, quantity };
    }
  }

  //Toodete eemaldamine laos kui toode lisatakse korvi
  reduceStock(productName, quantity) {
    if (
      this.stock[productName] &&
      this.stock[productName].quantity >= quantity
    ) {
      this.stock[productName].quantity -= quantity;
      return true;
    } else {
      return false;
    }
  }

  //Laosaadavuse kontrollimine
  checkStore(productName) {
    return this.stock[productName] ? this.stock[productName].quantity : 0;
  }
}
