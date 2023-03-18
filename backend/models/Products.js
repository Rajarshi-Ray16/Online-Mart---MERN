const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ProductSchema = new Schema({
    vendor: {
        type: String,
        required: true
    },
    buyer: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    addons: {
        type: Array,
        required: false,
    },
    orderTime: {
        type: Date,
        required: true
    }
});

module.exports = Product = mongoose.model("Products", ProductSchema);