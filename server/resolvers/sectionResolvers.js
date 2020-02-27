// Models
const Section = require("../models/Section");
const Student = require("../models/Student");
// Validators
const { validateCreateSection } = require("../config/validators");
const { UserInputError } = require("apollo-server");
const checkAuth = require("../config/authenticator");

module.exports = {
	Query: {
		async getSections() {
			try {
				const sections = await Section.find().sort({ name: 1 });
				return sections;
			} catch (err) {
				throw new Error(err);
			}
		}
	},
	Mutation: {
		async createSection(_, { name }, context) {
			const admin = checkAuth(context);
			const { errs, valid } = validateCreateSection(name);
			const section = await Section.findOne({ name });
			if (section) {
				throw new UserInputError("Section Exists", {
					errs: {
						name: "This Section Already Exists"
					}
				});
			}
			if (!valid) {
				throw new UserInputError("Errors", { errs });
			}

			const newSection = new Section({
				name,
				createdAt: new Date().toISOString()
			});

			const res = await newSection.save();

			return {
				...res._doc,
				id: res._id
			};
		},

		async deleteSection(_, { sectionId }, context) {
			try {
				const section = await Section.findById(sectionId);
				if (section) {
					await section.delete();
					return "Section Deleted";
				}
			} catch (err) {
				throw new Error(err);
			}
		}
	}
};
