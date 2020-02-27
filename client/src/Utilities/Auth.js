import React, { useReducer, createContext } from "react";
// Token
import jwtDecode from "jwt-decode";

const initialState = {
	admin: null
};

if (localStorage.getItem("jwtToken")) {
	const decodeToken = jwtDecode(localStorage.getItem("jwtToken"));
	if (decodeToken.exp * 1000 < Date.now()) {
		localStorage.removeItem("jwtToken");
	} else {
		initialState.admin = decodeToken;
	}
}

const AuthContext = createContext({
	admin: null,
	logInAdmin: adminData => {},
	logOutAdmin: () => {}
});

const authReducer = (state, action) => {
	switch (action.type) {
		case "LOGIN":
			return {
				...state,
				admin: action.payload
			};
		case "LOGOUT":
			return {
				...state,
				admin: null
			};
		default:
			return state;
	}
};

const AuthProvider = props => {
	const [state, dispatch] = useReducer(authReducer, initialState);
	const logInAdmin = adminData => {
		localStorage.setItem("jwtToken", adminData.token);
		dispatch({
			type: "LOGIN",
			payload: adminData
		});
	};

	const logOut = () => {
		localStorage.removeItem("jwtToken");
		dispatch({
			type: "LOGOUT"
		});
	};

	return (
		<AuthContext.Provider
			value={{ admin: state.admin, logInAdmin, logOut }}
			{...props}
		/>
	);
};

export { AuthContext, AuthProvider };
