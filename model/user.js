const mongoose = require("mongoose");

const User = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	otp: {
		type: Number,
	},
});

module.exports = mongoose.model("users", User);
