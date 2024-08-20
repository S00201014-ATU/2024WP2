const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for a product
const productSchema = new Schema({
  name: { type: String, required: true },       // Product name (required)
  price: { type: Number, required: true },      // Product price (required)
  imageUrl: {type: String, required: true},     // URL of the product image (required)
  description: { type: String, required: true },// Product description (required)
});

// Export the Product model based on the schema
module.exports = mongoose.model('Product', productSchema);
