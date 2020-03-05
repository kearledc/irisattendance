import gql from "graphql-tag";

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

export { dropStudentMutation, registerStudent, createSection, logInAdmin };
