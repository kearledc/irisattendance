import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/react-hooks";
// GQL
import { graphql } from "react-apollo";
import { getSectionsQuery, getSectionQuery } from "../Utilities/GraphqlQueries";
import { dropStudentMutation } from "../Utilities/GraphqlMutation";
// Auth
import { AuthContext } from "../Utilities/Auth";
// Semantic UI
import { Button, Icon, Label } from "semantic-ui-react";
// Sweet Alert
import Swal from "sweetalert2";
// Lodash
import { flowRight as compose } from "lodash";
// useParams hook from React Router
import { useParams } from "react-router-dom";
// Pages
import AbsentTracker from "./AbsentTracker";

const SectionPage = props => {
	const { id: sectionId } = useParams();
	const [students, setStudents] = useState([]);
	const [errs, setErrors] = useState({});
	const { admin } = useContext(AuthContext);

	const { loading } = useQuery(getSectionQuery, {
		onCompleted({ getSection: { students } }) {
			setStudents(students);
		},
		onError(err) {
			setErrors(err);
		},
		variables: { id: sectionId }
	});

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

	const onClickAbsent = e => {
		const id = e.target.id;
		console.log(id);
	};

	const studentList =
		students &&
		students.map(student => {
			return (
				<tr key={student.id}>
					<td>{student.lastName}</td>
					<td>{student.firstName}</td>
					<td>
						{student.absences}
						<button onClick={onClickAbsent} id={student.id}>
							+
						</button>
					</td>
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

	return (
		<div className={loading ? "loading" : ""}>
			{admin && (
				<div>
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
				</div>
			)}
		</div>
	);
};

export default compose(
	graphql(dropStudentMutation, { name: "dropStudentMutation" })
)(SectionPage);
