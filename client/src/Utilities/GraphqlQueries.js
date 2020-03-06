import gql from "graphql-tag";

const getStudentsQuery = gql`
	{
		getStudents {
			firstName
			lastName
			absences
			id
			sectionName
		}
	}
`;

const getSectionsQuery = gql`
	{
		getSections {
			id
			name
			createdAt
			students {
				firstName
				lastName
				sectionName
				absences
				id
				createdAt
			}
		}
	}
`;

const getSectionQuery = gql`
	query($id: String) {
		getSection(sectionId: $id) {
			id
			name
			createdAt
			students {
				firstName
				lastName
				absences
				sectionName
				id
				createdAt
			}
		}
	}
`;

export { getStudentsQuery, getSectionsQuery, getSectionQuery };
