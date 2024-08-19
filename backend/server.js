const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();
const authRoutes = require('./authRoutes'); // Auth routes for handling user registration/login
const { protect } = require('./authMiddleware'); // Auth middleware for protected routes

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB Connection URI from the environment
const uri = process.env.MONGODB_URI;

// Mongoose connection setup (for user authentication and schema-based operations)
async function connectToMongoose() {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB via Mongoose');
    } catch (error) {
        console.error('Error connecting to MongoDB via Mongoose:', error);
        process.exit(1); // Exit process if MongoDB connection fails
    }
}

// MongoClient setup for direct database manipulation (e.g., products)
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let database;

// MongoClient connection
async function connectToMongoClient() {
    try {
        await client.connect();
        database = client.db('WP2Repeat2024');
        console.log('Connected to MongoDB via MongoClient');
    } catch (error) {
        console.error('Error connecting to MongoDB via MongoClient:', error);
        process.exit(1); // Exit process if MongoDB connection fails
    }
}

// Connect to Mongoose and MongoClient
connectToMongoose();
connectToMongoClient();

app.use(bodyParser.json());
app.use(cors());

app.use('/auth', authRoutes); // Routes for user registration and authentication

app.get('/', (req, res) => {
    res.send("Backend testing 123");
});

// Middleware to check if MongoClient's database is connected before handling product-related requests
app.use((req, res, next) => {
    if (!database) {
        return res.status(500).json({ error: 'Database not connected' });
    }
    req.db = database;
    next();
});

// Get all products
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

// Get a single product by ID
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

// Create a new product
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

// Update an existing product by ID
app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const collection = req.db.collection('products');
        const updatedProduct = req.body;
        
        delete updatedProduct._id; // Remove _id from the request body

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
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Error updating product' });
    }
});

// Delete a product by ID
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

// Start the server after the database connections are established
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Gracefully shutdown the server and close MongoDB connections
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
