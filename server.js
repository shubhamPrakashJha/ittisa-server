// import Express and its middleware
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
let Message = require('./messages.model');

// Set the PORT to available port 
const PORT = 4000;
// create express app
const app = express();
// create an instance of the Express Router
const messageRoutes = express.Router();


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

// API Routings
messageRoutes.route('/').get(function (req, res) {
    Message.find(function (err, messages) {
        if (err) {
            console.log(err);
        } else {
            res.json(messages);
        }
    });
});

messageRoutes.route('/:id').get(function (req, res) {
    let id = req.params.id;
    Message.findById(id, function (err, message) {
        res.json(message);
    });
});

messageRoutes.route('/').post(function (req, res) {
    let message = new Message(req.body);
    message.save()
        .then(message => {
            res.status(200).json({ 'message': 'message added successfully' });
        })
        .catch(err => {
            res.status(400).send('adding new message failed');
        });
});

messageRoutes.route('/:id').put(function (req, res) {
    Message.findById(req.params.id, function (err, message) {
        if (!message) {
            res.status(404).send("data is not found")
        }
        else {
            message.name = req.body.name;
            message.email = req.body.email;
            message.query = req.body.query;
        }
        message.save().then(message => {
            res.json('Message updated!');
        })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

messageRoutes.route('/:id').delete(function (req, res) {
    Message.findByIdAndRemove(req.params.id)
        .then(message => {
            if (!message) {
                return res.status(404).send({
                    message: "message not found with id " + req.params.id
                });
            }
            res.send({ message: "message deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "message not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Could not delete message with id " + req.params.id
            });
        });
});

// router will take control of request starting with path /messages:
app.use('/messages', messageRoutes);
//  Express server listening on port 4000
app.listen(PORT, function () {
    console.log(`Server is listening on port ${PORT}`);
});