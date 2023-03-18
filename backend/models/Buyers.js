const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const BuyerSchema = new Schema({
    buyerName: {
        type: String,
        required: true
    },
    buyerEmail: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    buyerContactNumber: {
        type: Number,
        required: true
    },
    batchName: {
        type: String,
        required: true
    },
    buyerPassword: {
        type: String,
        required: true
    },
    wallet: {
        type: Number,
        required: false
    },
    date: {
        type: Date,
        required: false
    },
    loggedIn: {
        type: Boolean,
        required: true
    }
});

module.exports = Buyer = mongoose.model("Buyers", BuyerSchema);