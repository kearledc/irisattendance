import gql from "graphql-tag";

const dropStudentMutation = gql`
	mutation($id: String) {
		dropStudents(studentId: $id)
	}
`;

const registerStudent = gql`
	mutation registerStudent($firstName: String!, $lastName: String!) {
		registerStudent(
			registerStudent: { firstName: $firstName, lastName: $lastName }
		) {
			firstName
			lastName
			absences
			sectionName
			id
			createdAt
		}
	}
`;

export { dropStudentMutation, registerStudent };
