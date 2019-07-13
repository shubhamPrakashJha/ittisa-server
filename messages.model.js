const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    name: String,
    email: String,
    query: String,
    resolved: Boolean
}, {
        timestamps: true
    });

module.exports = mongoose.model('Message', MessageSchema);