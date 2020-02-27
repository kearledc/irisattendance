// Models
const Student = require("../models/Student");
// Validators
const { UserInputError } = require("apollo-server");
const { validateRegisterStudent } = require("../config/validators");
const checkAuth = require("../config/authenticator");

module.exports = {
	Query: {
		async getStudents() {
			try {
				const students = await Student.find().sort({ lastName: 1 });
				return students;
			} catch (err) {
				throw new Error(err);
			}
		}
	},
	Mutation: {
		async registerStudent(
			_,
			{ registerStudent: { firstName, lastName, sectionName } },
			context
		) {
			const admin = checkAuth(context);
			const { valid, errs } = validateRegisterStudent(
				firstName,
				lastName
			);
			if (!valid) {
				throw new UserInputError("Errors", { errs });
			}
			const student = await Student.findOne({ firstName, lastName });
			if (student) {
				throw new UserInputError("Student already Registered", {
					errs: {
						firstName: "Student Already Registered",
						lastName: "Student Already Registered"
					}
				});
			}
			const newStudent = new Student({
				firstName,
				lastName,
				sectionName,
				absences: 0,
				createdAt: new Date().toISOString(),
				addedBy: admin.id
			});
			const res = await newStudent.save();
			return {
				...res._doc,
				id: res._id
			};
		},

		async updateStudent(_, { studentId, updateStudent }, context) {
			const admin = checkAuth(context);
			return Student.findByIdAndUpdate(studentId, updateStudent, {
				new: true
			})
				.then(res => res)
				.catch(err => console.log(err));
		},

		async dropStudent(_, { studentId }) {
			try {
				const student = await Student.findById(studentId);
				if (student) {
					await student.delete();
					return "Student Dropped";
				}
			} catch (err) {
				throw new Error(err);
			}
		}
	}
};
