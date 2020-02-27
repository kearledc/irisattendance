import React, { useState, useContext } from "react";
// Semantic UI
import { Button, Form } from "semantic-ui-react";
// GraphQL
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
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
		update(_, { data: { registerStudent: studentData } }) {
			context.login(studentData);
			props.history.push("./");
		},
		onError(errs) {
			console.log(errs);
			// setErrors(err.graphQLErrors[0].extension.exception.errs);
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

const registerStudent = gql`
	mutation registerStudent(
		$firstName: String!
		$lastName: String!
		$sectionName: String!
	) {
		registerStudent(
			registerStudent: {
				firstName: $firstName
				lastName: $lastName
				sectionName: $sectionName
			}
		) {
			firstName
			lastName
			sectionName {
				name
			}
			absences
			id
			createdAt
		}
	}
`;

export default RegisterStudent;
