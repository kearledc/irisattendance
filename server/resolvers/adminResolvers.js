// Models
const Admin = require("../models/Admin");
// Bcrypt
const bcrypt = require("bcryptjs");
// Token
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../configuration");
// Error Checkers and Validators
const { UserInputError } = require("apollo-server");
const {
	validateRegisterAdmin,
	validateLogInAdmin
} = require("../config/validators");

const generateToken = admin => {
	return jwt.sign(
		{
			id: admin.id,
			username: admin.username
		},
		SECRET_KEY,
		{ expiresIn: "1h" }
	);
};

module.exports = {
	Query: {
		async getAdmins() {
			try {
				const admins = await Admin.find().sort({ createdAt: -1 });
				return admins;
			} catch (err) {
				throw new Error(err);
			}
		}
	},

	Mutation: {
		async logInAdmin(_, { username, password }) {
			const { errs, valid } = validateLogInAdmin(username, password);
			const admin = await Admin.findOne({ username });

			if (!valid) {
				throw new UserInputError("Errors", { errs });
			}
			if (!admin) {
				errs.general = "User not found";
				throw new UserInputError("Incorrect Data", { errs });
			}

			const match = await bcrypt.compare(password, admin.password);
			if (!match) {
				errs.general = "Wrong Password";
				throw new UserInputError("Wrong Password", { errs });
			}

			const token = generateToken(admin);

			return {
				...admin._doc,
				id: admin._id,
				token
			};
		},
		async registerAdmin(
			_,
			{
				registerAdmin: {
					firstName,
					lastName,
					username,
					password,
					confirmPassword
				}
			},
			context,
			info
		) {
			const { valid, errs } = validateRegisterAdmin(
				username,
				password,
				confirmPassword
			);
			if (!valid) {
				throw new UserInputError("Errors", { errs });
			}

			const admin = await Admin.findOne({ username });
			if (admin) {
				throw new UserInputError("Username is already taken", {
					errs: {
						username: "This username is taken!"
					}
				});
			}

			password = await bcrypt.hashSync(password, 12);

			const newAdmin = new Admin({
				firstName,
				lastName,
				username,
				password,
				createdAt: new Date().toISOString()
			});

			const res = await newAdmin.save();
			const token = generateToken(res);

			return {
				...res._doc,
				id: res._id,
				token
			};
		}
	}
};
