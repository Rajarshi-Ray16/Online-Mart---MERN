const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const VendorSchema = new Schema({
	vendorName: {
		type: String,
		required: true
	},
	vendorEmail: {
		type: String,
		required: true
	},
	shopName:{
		type: String,
		required: true
	},
    vendorContactNumber: {
        type: Number,
        required: true
    },
    openingTime: {
        type: String,
        required: true
    },
    closingTime: {
        type: String,
        required: true
    },
	vendorPassword: {
		type: String,
		required: true
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

module.exports = Vendor = mongoose.model("Vendors", VendorSchema);
