// import Express and its middleware
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Set the PORT to available port 
const PORT = 4000;
// create express app
const app = express();


//  providing a Connect/Express middleware 
app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.json());


//  Express server listening on port 4000
app.listen(PORT, function () {
    console.log(`Server is listening on port ${PORT}`);
});