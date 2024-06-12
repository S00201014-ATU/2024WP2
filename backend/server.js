const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient } = require('mongodb')

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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})