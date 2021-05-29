const mongoose = require("mongoose");

const Product = new mongoose.Schema({
	product_name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	quantity: {
		type: Number,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	category: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "categories",
	},
});

module.exports = mongoose.model("products", Product);
