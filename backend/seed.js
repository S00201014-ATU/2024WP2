const {MongoClient} = require('mongodb');

const uri = "mongodb+srv://Matthew902:Manu1234@wp2repeat2024.bmdxgib.mongodb.net/?retryWrites=true&w=majority&appName=WP2Repeat2024";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true});

async function seedProducts() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        const database = client.db('WP2Repeat2024');
        const collection = database.collection('products');

        const initialProducts = [
            { name: 'Portugal', price: 50.00, imageUrl: 'https://www.sportsdirect.com/images/products/37096608_l.jpg', description: 'More glory for Ronaldo?' },
            { name: 'England', price: 20.00, imageUrl: 'https://www.sportsdirect.com/images/products/37078101_l.jpg', description: 'Is it coming home?' },
            { name: 'France', price: 100.00, imageUrl: 'https://www.sportsdirect.com/images/products/37997518_l.jpg', description: 'Mbappe to lead the way?' },
            { name: 'Netherlands', price: 10.00, imageUrl: 'https://www.sportsdirect.com/images/products/37263512_l.jpg', description: 'Could they be the dark horses?' },
            { name: 'Ireland', price: 80.00, imageUrl: 'https://www.soccerbox.com/media/catalog/product/cache/f4b6407e5847ea579fdc5730945961f6/i/r/ireland-kids-home-shirt-23.jpg', description: 'Why are we not there?' },
            { name: 'Scotland', price: 25.00, imageUrl: 'https://www.sportsdirect.com/images/products/36099218_l.jpg', description: 'How many goals will they concede?' }
        ];

        await collection.insertMany(initialProducts);
        console.log('Initial products inserted successfully');
    }   catch (error) {
        console.error('Error seeding products', error);
    }   finally {
        await client.close();
        console.log('Connection to MongoDB closed')
    }
}

seedProducts();