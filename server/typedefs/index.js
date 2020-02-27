const { gql } = require("apollo-server-express");

module.exports = gql`
	type AdminType {
		id: ID!
		username: String!
		firstName: String!
		lastName: String!
		token: String!
		password: String!
		createdAt: String
	}

	type SectionType {
		id: ID!
		name: String!
		createdAt: String!
		students: [StudentType]
	}

	type StudentType {
		id: ID!
		firstName: String!
		lastName: String!
		absences: Int!
		sectionName: [SectionType]!
		createdAt: String
	}
	input RegisterStudent {
		firstName: String
		lastName: String
		absences: Int
		sectionName: [StudentSection]
		addedBy: String
	}

	input StudentSection {
		name: String!
		createdAt: String
	}

	input RegisterAdmin {
		username: String!
		password: String!
		confirmPassword: String!
		firstName: String!
		lastName: String!
	}

	type Query {
		getAdmins: [AdminType]
		getSections: [SectionType]
		getStudents: [StudentType]
	}

	type Mutation {
		registerAdmin(registerAdmin: RegisterAdmin): AdminType!
		logInAdmin(username: String, password: String): AdminType!

		registerStudent(registerStudent: RegisterStudent): StudentType!
		updateStudent(
			studentId: ID
			updateStudent: RegisterStudent
		): StudentType!
		dropStudent(studentId: ID): String!

		createSection(name: String): SectionType!
		deleteSection(sectionId: ID): String!
	}
`;
