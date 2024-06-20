const {MongoClient} = require('mongodb');
const bcrypt = require('bcrypt');
const User = require('./user');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function seedUsers() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        const database = client.db('WP2Repeat2024');
        const collection = database.collection('users');

        const initialUsers = [
        {
            username: 'admin',
            password: await bcrypt.hash('12345', 10)
        },
        {
            username: 'matthew',
            password: await bcrypt.hash('F3rm4n4gh', 10)
        }
    ];

        await collection.insertMany(initialUsers);
        console.log('Initial users inserted successfully');
    }   catch (error) {
        console.error('Error seeding users', error);
    }   finally {
        await client.close();
        console.log('Connection to MongoDB closed')
    }
}

seedUsers();