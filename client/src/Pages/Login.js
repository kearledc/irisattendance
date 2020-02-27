import React, { useContext, useState } from "react";
// Semantic UI
import { Button, Form } from "semantic-ui-react";
// GraphQL
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
// Hooks
import { useForm } from "../Utilities/Hooks";
// Auth
import { AuthContext } from "../Utilities/Auth";

const Login = props => {
	const context = useContext(AuthContext);
	const [errs, setErrors] = useState({});
	const { onChange, onSubmitForm, values } = useForm(logInAdminCallback, {
		username: "",
		password: ""
	});

	const [loggingIn, { loading }] = useMutation(logInAdmin, {
		update(_, { data: { logInAdmin: adminData } }) {
			context.logInAdmin(adminData);
			props.history.push("/");
		},
		onError(err) {
			setErrors(err.graphQLErrors[0].extensions.exception.errs);
		},
		variables: values
	});

	function logInAdminCallback() {
		loggingIn();
	}

	return (
		<div className="register-container">
			<Form
				onSubmit={onSubmitForm}
				noValidate
				method="POST"
				className={loading ? "loading" : ""}
			>
				<h1>Login</h1>
				<Form.Input
					label="Username"
					placeholder="Username.."
					name="username"
					value={values.username}
					errs={errs.username ? true : false}
					onChange={onChange}
					type="text"
				/>

				<Form.Input
					label="Password"
					placeholder="Password.."
					name="password"
					value={values.password}
					errs={errs.password ? true : false}
					onChange={onChange}
					type="password"
				/>

				<Button type="submit" primary>
					Login
				</Button>
			</Form>
			{Object.keys(errs).length > 0 && (
				<div className="ui error message">
					<ul className="list">
						{Object.values(errs).map(value => (
							<li key={value}>{value}</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

const logInAdmin = gql`
	mutation logInAdmin($username: String!, $password: String!) {
		logInAdmin(username: $username, password: $password) {
			id
			username
			password
			firstName
			lastName
			token
			createdAt
		}
	}
`;

export default Login;
