import React, { useState, useContext } from "react";
// Semantic UI
import { Button, Form, Select } from "semantic-ui-react";
// GraphQL
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { registerStudent } from "../Utilities/GraphqlMutation";
// Hooks
import { useForm } from "../Utilities/Hooks";
// Auth
import { AuthContext } from "../Utilities/Auth";

const RegisterStudent = props => {
	const [errs, setErrors] = useState({});
	const context = useContext(AuthContext);

	const { onChange, onSubmitForm, values } = useForm(registry, {
		firstName: "",
		lastName: ""
	});

	const [addStudent, { loading }] = useMutation(registerStudent, {
		update(_, { data: { registerStudent: adminData } }) {
			props.history.push("./");
		},
		onError(errs) {
			setErrors(errs.graphQLErrors[0].extensions.exception.errs);
		},
		variables: values
	});

	function registry() {
		addStudent();
	}

	return (
		<div>
			<Form
				onSubmit={onSubmitForm}
				noValidate
				method="POST"
				className={loading ? "loading" : ""}
			>
				<h1>Enroll A Student</h1>
				<Form.Input
					label="First Name"
					placeholder="Enter First Name"
					name="firstName"
					value={values.firstName}
					errs={errs.firstName ? true : false}
					onChange={onChange}
					type="text"
				/>
				<Form.Input
					label="Last Name"
					placeholder="Enter Last Name"
					name="lastName"
					value={values.lastName}
					errs={errs.lastName ? true : false}
					onChange={onChange}
				/>

				<Button type="submit">Register Student</Button>
			</Form>

			{Object.keys(errs).length > 0 && (
				<div className="error ui message">
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

export default RegisterStudent;
