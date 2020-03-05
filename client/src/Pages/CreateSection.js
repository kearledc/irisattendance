import React, { useState, useContext } from "react";
import { useMutation } from "@apollo/react-hooks";
// Semantic UI
import { Form, Button } from "semantic-ui-react";
// GQL
import { createSection } from "../Utilities/GraphqlMutation";
// Auth
import { AuthContext } from "../Utilities/Auth";
// Hooks
import { useForm } from "../Utilities/Hooks";

const CreateSection = props => {
	const [errs, setErrors] = useState({});
	const context = useContext(AuthContext);

	const { onChange, onSubmitForm, values } = useForm(create, {
		name: ""
	});

	const [addSection, { loading }] = useMutation(createSection, {
		update(_, { data: { createSection: sectionData } }) {
			// context.login(sectionData);
			props.history.push("./");
		},
		onError(err) {
			setErrors(err.graphQLErrors[0].extensions.exception.errs);
		},
		variables: values
	});

	function create() {
		addSection();
	}

	return (
		<div>
			<Form
				onSubmit={onSubmitForm}
				noValidate
				method="POST"
				className={loading ? "loading" : ""}
			>
				<h1> Create A Section </h1>
				<Form.Input
					label="Section Name"
					placeholder="Enter A Section Name.."
					name="name"
					value={values.name}
					error={errs.name ? true : false}
					onChange={onChange}
					type="text"
				/>
				<Button type="submit" primary>
					Create Section
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

export default CreateSection;
