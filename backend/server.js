const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();
const authRoutes = require('./authRoutes'); 
const { protect } = require('./authMiddleware'); 

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB Connection URI from environment variables
const uri = process.env.MONGODB_URI;

// Setup Mongoose connection (used for user-related operations)
async function connectToMongoose() {
    try {
        await mongoose.connect(uri, {});
        console.log('Connected to MongoDB via Mongoose for user-related operations');
    } catch (error) {
        console.error('Error connecting to MongoDB via Mongoose:', error);
        process.exit(1); // Exit if connection fails
    }
}

// Setup MongoClient connection (used for product-related operations)
const client = new MongoClient(uri, {});
let database;

// Connect to MongoDB using MongoClient
async function connectToMongoClient() {
    try {
        await client.connect();
        database = client.db('WP2Repeat2024');
        console.log('Connected to MongoDB via MongoClient for product-related operations');
    } catch (error) {
        console.error('Error connecting to MongoDB via MongoClient:', error);
        process.exit(1); // Exit if connection fails
    }
}

// Connect to both Mongoose and MongoClient
connectToMongoose();
connectToMongoClient();

app.use(bodyParser.json());

// CORS configuration
const allowedOrigins = [
  'https://s00201014wp2.netlify.app', 
  'http://localhost:4200'  
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps, curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization'
}));

app.use('/auth', authRoutes); // Routes for user authentication

// Simple route for testing server
app.get('/', (req, res) => {
    res.send("Backend testing 123");
});

// Middleware to ensure database is connected before handling product-related requests
app.use((req, res, next) => {
    if (!database) {
        return res.status(500).json({ error: 'Database not connected' });
    }
    req.db = database;
    next();
});

// Get all products from the database
app.get('/products', async (req, res) => {
    try {
        const collection = req.db.collection('products');
        const products = await collection.find({}).toArray();
        res.json(products);
    } catch (error) {
        console.error('Error fetching products', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get a specific product by its ID
app.get('/products/:id', async (req, res) => {
    try {
        const collection = req.db.collection('products');
        const product = await collection.findOne({ _id: new ObjectId(req.params.id) });
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Create a new product in the database
app.post('/products', async (req, res) => {
    try {
        const collection = req.db.collection('products');
        const { _id, ...productData } = req.body;
        const result = await collection.insertOne(productData);
        const newProduct = await collection.findOne({ _id: result.insertedId });
        res.json(newProduct);
    } catch (error) {
        console.error('Error creating product', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update an existing product by its ID
app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const collection = req.db.collection('products');
        const updatedProduct = req.body;
        
        delete updatedProduct._id; // Remove _id to avoid conflicts
        const result = await collection.findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $set: updatedProduct }, 
            { returnOriginal: false }
        );

        const updatedDocument = result.value;
        if (!updatedDocument) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json(updatedDocument);
    } catch (error) {
        console.error('Error updating product', error);
        res.status(500).json({ error: 'Error updating product' });
    }
});

// Delete a product by its ID
app.delete('/products/:id', async (req, res) => {
    try {
        const collection = req.db.collection('products');
        const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product by ID', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start the server and listen on the defined port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Handle server shutdown and close MongoDB connections
process.on('SIGINT', async () => {
    console.log('Shutting down server...');
    try {
        await mongoose.connection.close();
        await client.close();
        console.log('MongoDB connections closed.');
    } catch (error) {
        console.error('Error closing MongoDB connections:', error);
    }
    process.exit(0);
});
