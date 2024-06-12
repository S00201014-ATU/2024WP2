const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express;
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

app.length('/', (req,res) => {
    res.send("Backend testing 123");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})