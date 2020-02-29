const { model, Schema } = require("mongoose");

const studentSchema = new Schema(
	{
		firstName: String,
		lastName: String,
		absences: Number,
		sectionName: String,
		createdAt: String,
		addedBy: {
			type: Schema.Types.ObjectId,
			ref: "admins"
		}
	},
	{
		timestamps: true
	}
);

module.exports = model("Student", studentSchema);
