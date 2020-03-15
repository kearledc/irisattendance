import gql from "graphql-tag";

//  Students
const dropStudentMutation = gql`
	mutation($id: String) {
		dropStudent(studentId: $id)
	}
`;

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
			absences
			sectionName
			id
			createdAt
		}
	}
`;

const updateStudentMutation = gql`
	mutation updateStudent(
		$id: String
		$firstName: String
		$lastName: String
		$absences: Int
		$sectionName: String
	) {
		updateStudent(
			updateStudent: {
				firstName: $firstName
				lastName: $lastName
				sectionName: $sectionName
				absences: $absences
			}
		) {
			id
			firstName
			lastName
			sectionName
			absences
		}
	}
`;

// Sections
const deleteSection = gql`
	mutation($id: String) {
		deleteSection(sectionId: $id)
	}
`;

const createSection = gql`
	mutation createSection($name: String!) {
		createSection(name: $name) {
			id
			name
			createdAt
		}
	}
`;

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

export {
	dropStudentMutation,
	registerStudent,
	updateStudentMutation,
	createSection,
	deleteSection,
	logInAdmin
};
