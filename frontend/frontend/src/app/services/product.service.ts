import { Injectable } from "@angular/core";
import { Product } from "../models/product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    { id: 1, name: 'Portugal', price: 50.00, imageUrl: 'https://www.sportsdirect.com/images/products/37096608_l.jpg', description: 'More glory for Ronaldo?' },
    { id: 2, name: 'England', price: 20.00, imageUrl: 'https://www.sportsdirect.com/images/products/37078101_l.jpg', description: 'Is it coming home?' },
    { id: 3, name: 'France', price: 100.00, imageUrl: 'https://www.sportsdirect.com/images/products/37997518_l.jpg', description: 'Mbappe to lead the way?' },
    { id: 4, name: 'Netherlands', price: 10.00, imageUrl: 'https://www.sportsdirect.com/images/products/37263512_l.jpg', description: 'Could they be the dark horses?' },
    { id: 5, name: 'Ireland', price: 80.00, imageUrl: 'https://www.soccerbox.com/media/catalog/product/cache/f4b6407e5847ea579fdc5730945961f6/i/r/ireland-kids-home-shirt-23.jpg', description: 'Why are we not there?' },
    { id: 6, name: 'Scotland', price: 25.00, imageUrl: 'https://www.sportsdirect.com/images/products/36099218_l.jpg', description: 'How many goals will they concede?' },
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
