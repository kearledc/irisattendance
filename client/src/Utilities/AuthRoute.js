import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { AuthContext } from "./Auth";

const AuthRoute = ({ component: Component, ...rest }) => {
	const { admin } = useContext(AuthContext);

	return (
		<Route
			{...rest}
			render={props =>
				admin ? <Redirect to="/" /> : <Component {...props} />
			}
		/>
	);
};

export default AuthRoute;
