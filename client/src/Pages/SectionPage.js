import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
// GQL
import gql from "graphql-tag";
import { getStudentsQuery } from "../Utilities/GraphqlQueries";
import dropStudentQuery from "../Utilities/GraphqlMutation";
// Auth
import { AuthContext } from "../Utilities/Auth";
const SectionPage = props => {
	const { admin } = useContext(AuthContext);
	const { loading, data } = useQuery(getStudentsQuery);
	const students = data ? data.getStudents : [];

	const dropStudent = e => {};

	const studentList = students.map(student => {
		return (
			<tr key={student.id}>
				<td>{student.lastName}</td>
				<td>{student.firstName}</td>
				<td>{student.absences}</td>
				<td>{student.sectionName}</td>
			</tr>
		);
	});
	return (
		<table className="table">
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
	);
};

export default SectionPage;
