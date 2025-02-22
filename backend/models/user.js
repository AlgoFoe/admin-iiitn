const mongoose = require("mongoose"); // Use require instead of import

const userSchema = new mongoose.Schema(
	{
		role: {
			type: String,
			required: true,
		},
		username: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			minlength: 6,
		},
    },
);

const User = mongoose.model("User", userSchema);

module.exports = User;