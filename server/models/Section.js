const { Schema, model } = require("mongoose");

const sectionsSchema = new Schema(
	{
		name: String,
		createdAt: String
	},
	{
		timestamps: true
	}
);

module.exports = model("Section", sectionsSchema);
