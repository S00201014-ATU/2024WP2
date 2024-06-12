import { Injectable } from "@angular/core";
import { Product } from "../models/product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    { id: 1, name: 'Portugal', price: 50.00, imageUrl: 'https://cdn.footballkitarchive.com/2024/03/18/nkshdzfrkiXGUmC.jpg', description: 'More glory for Ronaldo?' },
    { id: 2, name: 'England', price: 20.00, imageUrl: 'https://cdn.footballkitarchive.com/2024/03/20/eIBe01GsLB2TAEG.jpg', description: 'Is it coming home?' },
    { id: 3, name: 'France', price: 100.00, imageUrl: 'https://cdn.footballkitarchive.com/2024/03/19/IHofQUS745D2Zl4.jpg', description: 'Mbappe to lead the way?' },
    { id: 4, name: 'Netherlands', price: 10.00, imageUrl: 'https://cdn.footballkitarchive.com/2024/03/20/Io9t2jHZKVdvr0W.jpg', description: 'Could they be the dark horses?' },
    { id: 5, name: 'Ireland', price: 80.00, imageUrl: 'https://cdn.footballkitarchive.com/2024/03/22/jmWxmFIOuo66e16.jpg', description: 'Why are we not there?' },
    { id: 6, name: 'Romania', price: 5.00, imageUrl: 'https://cdn.footballkitarchive.com/2023/03/21/Lbhju3KFyexzIsW.jpg', description: 'How many goals will they concede?' },
  ];

  constructor() { }

  getProducts(): Product[] {
    return this.products;
  }

  getProductById(id: number): Product | undefined {
    return this.products.find(product => product.id === id);
  }

  addProduct(product: Product): void {
    this.products.push(product);
  }

  updateProduct(updatedProduct: Product): void {
    const index = this.products.findIndex(product => product.id === updatedProduct.id);
    if (index !== -1) {
      this.products[index] = updatedProduct;
    }
  }

  deleteProduct(id: number): void {
    this.products = this.products.filter(product => product.id !== id);
  }
}
