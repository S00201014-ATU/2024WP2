const { MongoClient, ObjectId } = require('mongodb');

const uri = "mongodb+srv://Matthew902:Manu1234@wp2repeat2024.bmdxgib.mongodb.net/?retryWrites=true&w=majority";

async function seedProducts() {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();

        const database = client.db('WP2Repeat2024');
        const collection = database.collection('products');

        const products = [
            {
                _id: new ObjectId(),
                name: "Spain",
                price: 60,
                imageUrl: "https://www.sportsdirect.com/images/products/37919708_l.jpg",
                description: "La Roja looking strong!"
            },
        ];

        const result = await collection.insertMany(products);
        console.log(`${result.insertedCount} products inserted successfully`);

    } catch (error) {
        console.error('Error seeding products:', error);
    } finally {
        await client.close();
    }
}

seedProducts();
