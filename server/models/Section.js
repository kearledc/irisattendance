const { Schema, model } = require("mongoose");

const sectionsSchema = new Schema(
	{
		name: String,
		createdAt: String,
		students: [
			{
				firstName: String,
				lastName: String,
				absences: Number
			}
		]
	},
	{
		timestamps: true
	}
);

module.exports = model("Section", sectionsSchema);
