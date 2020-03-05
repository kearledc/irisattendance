import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
// GQL
import { getSectionsQuery } from "../Utilities/GraphqlQueries";
// Semantic UI
import { Grid } from "semantic-ui-react";
// Components
import SectionCard from "../Components/SectionCard";
// Auth
import { AuthContext } from "../Utilities/Auth";
// CSS
import "../Styles/style.css";

const Home = () => {
	const { loading, data } = useQuery(getSectionsQuery);
	const sections = data ? data.getSections : [];
	const { admin } = useContext(AuthContext);

	return (
		<Grid columns={3} divided>
			<Grid.Row>
				{admin && (
					<h1 className="sectionList_Header">
						Welcome {admin.firstName}
					</h1>
				)}
			</Grid.Row>
			<Grid.Row>
				{admin &&
					sections &&
					sections.map(section => (
						<Grid.Column
							key={section.id}
							className={
								loading ? "loading sectionContainer" : ""
							}
							style={{ marginBottom: 20 }}
						>
							<SectionCard section={section} />
						</Grid.Column>
					))}
			</Grid.Row>
		</Grid>
	);
};

export default Home;
