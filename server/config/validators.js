module.exports.validateRegisterAdmin = (
	username,
	password,
	confirmPassword
) => {
	const errs = {};
	if (username.trim() === "") {
		errs.username = "Username must not be Empty";
	} else if (username.length < 8) {
		errs.username = "Username must exceed 8 characters";
	}
	if (password.trim() === "") {
		errs.password = "Password must not be Empty";
	} else if (password !== confirmPassword) {
		errs.confirmPassword = "Passwords must match!";
	} else if (password.length < 8) {
		errs.password = "Password must exceed 8 characters";
	}

	return {
		errs,
		valid: Object.keys(errs).length < 1
	};
};

module.exports.validateLogInAdmin = (username, password) => {
	const errs = {};
	if (username.trim() === "") {
		errs.username = "Username must not be empty";
	}
	if (password.trim() === "") {
		errs.password = "Password must not be empty";
	}

	return {
		errs,
		valid: Object.keys(errs).length < 1
	};
};

module.exports.validateCreateSection = name => {
	const errs = {};
	if (name.trim() === "") {
		errs.name = "Section Name must not be Empty";
	}
	return {
		errs,
		valid: Object.keys(errs).length < 1
	};
};

module.exports.validateRegisterStudent = (firstName, lastName) => {
	const errs = {};
	if (firstName.trim() === "") {
		errs.firstName = "First Name must not be Empty";
	}
	if (lastName.trim() === "") {
		errs.lastName = "Last Name must not be Empty";
	}
	return {
		errs,
		valid: Object.keys(errs).length < 1
	};
};
