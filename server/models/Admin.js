const { model, Schema } = require("mongoose");

const adminSchema = new Schema(
	{
		firstName: String,
		lastName: String,
		username: String,
		password: String,
		createdAt: String
	},
	{
		timestamps: true
	}
);

module.exports = model("Admin", adminSchema);
