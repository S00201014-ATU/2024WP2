// Interface representing a Product object
export interface Product {
  _id: string;       // Unique identifier for the product
  name: string;      // Name of the product
  price: number;     // Price of the product
  imageUrl: string;  // URL to the product's image
  description: string; // Description of the product
}
