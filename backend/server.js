const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb')

const app = express;
const PORT = process.env.PORT || 3000;

const uri = "mongodb+srv://Matthew902:Manu1234@wp2repeat2024.bmdxgib.mongodb.net/?retryWrites=true&w=majority&appName=WP2Repeat2024"
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true});

async function connect() {
    try{
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
    }
}

connect();

app.use(bodyParser.json());
app.use(cors());

app.length('/', (req,res) => {
    res.send("Backend testing 123");
});

app.get('/products', async (req, res) => {
    try {
      const database = client.db('WP2Repeat2024');
      const collection = database.collection('products');
      const products = await collection.find({}).toArray();
      res.json(products);
    } catch (error) {
      console.error('Error fetching products', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.get('/products/:id', async (req, res) => {
    try {
      const database = client.db('WP2Repeat2024');
      const collection = database.collection('products');
      const product = await collection.findOne({ _id: ObjectId(req.params.id) });
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json(product);
    } catch (error) {
      console.error('Error fetching product by ID', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.post('/products', async (req, res) => {
    try {
      const database = client.db('WP2Repeat2024');
      const collection = database.collection('products');
      const result = await collection.insertOne(req.body);
      res.json(result.ops[0]);
    } catch (error) {
      console.error('Error creating product', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.put('/products/:id', async (req, res) => {
    try {
      const database = client.db('WP2Repeat2024');
      const collection = database.collection('products');
      const result = await collection.updateOne({ _id: ObjectId(req.params.id) }, { $set: req.body });
      res.json({ message: 'Product updated successfully' });
    } catch (error) {
      console.error('Error updating product by ID', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.delete('/products/:id', async (req, res) => {
    try {
      const database = client.db('WP2repeat2024');
      const collection = database.collection('products');
      const result = await collection.deleteOne({ _id: ObjectId(req.params.id) });
      res.json({ message: 'Product deleted successfully' });
    } catch (error) {
      console.error('Error deleting product by ID', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });