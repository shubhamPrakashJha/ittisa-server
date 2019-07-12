// import Express and its middleware
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

// Set the PORT to available port 
const PORT = 4000;
// create express app
const app = express();


//  providing a Connect/Express middleware 
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.json());


// connect mongoDB 
mongoose.connect('mongodb://127.0.0.1:27017/messages', {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});


//  Express server listening on port 4000
app.listen(PORT, function () {
    console.log(`Server is listening on port ${PORT}`);
});