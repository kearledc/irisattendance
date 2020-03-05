import React, { useState, useContext } from "react";
// Semantic UI
import { Button, Form } from "semantic-ui-react";
// GraphQL
import { useMutation, useQuery } from "@apollo/react-hooks";
import { registerStudent } from "../Utilities/GraphqlMutation";
import { getSectionsQuery } from "../Utilities/GraphqlQueries";
// Hooks
import { useForm } from "../Utilities/Hooks";
// Auth
import { AuthContext } from "../Utilities/Auth";

const RegisterStudent = props => {
	const [errs, setErrors] = useState({});
	const context = useContext(AuthContext);
	const { data } = useQuery(getSectionsQuery);
	const sectionList = data ? data.getSections : [];

	const { onChange, onSubmitForm, values } = useForm(registry, {
		firstName: "",
		lastName: "",
		sectionName: ""
	});

	const sectionOption = sectionList.map(section => {
		return <option key={section.id}>{section.name}</option>;
	});

	const [addStudent, { loading }] = useMutation(registerStudent, {
		update(_, { data: { registerStudent: studentData } }) {
			props.history.push("./");
		},
		onError(err) {
			setErrors(err.graphQLErrors[0].extensions.exception.errs);
		},
		variables: values
	});

	function registry() {
		addStudent();
	}

	return (
		<div>
			<Form onSubmit={onSubmitForm}>
				<h1>Register A Student</h1>
				<Form.Input
					label="First Name"
					placeholder="Enter a First Name"
					name="firstName"
					value={values.firstName}
					error={errs.firstName ? true : false}
					onChange={onChange}
				/>

				<Form.Input
					label="Last Name"
					placeholder="Enter a Last Name"
					name="lastName"
					value={values.lastName}
					error={errs.lastName ? true : false}
					onChange={onChange}
				/>

				<label>Section Name</label>
				<select
					id="sectionSelect"
					name="sectionName"
					value={values.sectionName}
					onChange={onChange}
				>
					<option defaultValue>Choose A Section..</option>
					{sectionOption}
				</select>
				<Button type="submit" primary>
					Register Student
				</Button>
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
