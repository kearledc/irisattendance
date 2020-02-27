const { AuthenticationError } = require("apollo-server");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../configuration");

module.exports = context => {
	const authHeader = context.req.headers.authorization;
	if (authHeader) {
		const token = authHeader.split("Bearer ")[1];
		if (token) {
			try {
				const admin = jwt.verify(token, SECRET_KEY);
				return admin;
			} catch (err) {
				throw new AuthenticationError("Invalid/Expired Token");
			}
		}
		throw new Error("Authentication token must be 'Bearer [token]'");
	}
	throw new Error("Authorization header must be provided");
};
