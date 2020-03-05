import React, { useContext, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
// GQL
import { graphql } from "react-apollo";
import { getSectionsQuery } from "../Utilities/GraphqlQueries";
import { dropStudentMutation } from "../Utilities/GraphqlMutation";
// Auth
import { AuthContext } from "../Utilities/Auth";
// Semantic UI
import { Button } from "semantic-ui-react";
// Sweet Alert
import Swal from "sweetalert2";
// Lodash
import { flowRight as compose } from "lodash";

const SectionPage = props => {
	const { admin } = useContext(AuthContext);
	const { loading, data } = useQuery(getSectionsQuery);
	const [errs, setErrors] = useState({});
	const sections = data ? data.getSections : [];
	const onClickDropStudent = e => {
		let id = e.target.id;
		Swal.fire({
			title: "Are you sure you want to drop the Student?",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes"
		}).then(result => {
			if (result.value) {
				props.dropStudentMutation({
					variables: { id: id }
				});
				Swal.fire(
					"Deleted!",
					"The Student has been Dropped.",
					"success"
				).then(window.location.reload());
			}
		});
	};

	const studentList = sections.map(section => {
		return section.students.map(student => {
			return (
				<tr key={student.id}>
					<td>{student.firstName}</td>
					<td>{student.lastName}</td>
					<td>{student.absences}</td>
					<td>{student.sectionName}</td>
					<td>
						<Button
							color="red"
							onClick={onClickDropStudent}
							id={student.id}
						>
							Drop Student
						</Button>
					</td>
				</tr>
			);
		});
	});

	return (
		<div className={loading ? "loading" : ""}>
			{admin && (
				<table className="table" id="studentTable">
					<thead>
						<tr>
							<th>Last Name</th>
							<th>First Name</th>
							<th>Absences</th>
							<th>Section</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>{studentList}</tbody>
				</table>
			)}
		</div>
	);
};

export default compose(
	graphql(dropStudentMutation, { name: "dropStudentMutation" })
)(SectionPage);
