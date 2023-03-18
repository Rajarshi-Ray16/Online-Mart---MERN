const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ItemSchema = new Schema({
    vendor: {
        type: String,
        required: true
    },
    itemName: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        default: 0,
    },
    veg: {
        type: Boolean,
        required: true,
    },
    addons: {
        type: Array,
        required: false,
    },
    tags: {
        type: Array,
        required: false,
    },
    timesOrdered: {
        type: Number,
        required: true
    }
});

module.exports = Item = mongoose.model("Items", ItemSchema);