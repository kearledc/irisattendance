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

export { getStudentsQuery, getSectionsQuery };
