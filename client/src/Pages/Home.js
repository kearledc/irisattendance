import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
// GQL
import gql from "graphql-tag";
import { getSectionsQuery } from "../Utilities/GraphqlQueries";
// Semantic UI
import { Grid, Segment, Dimmer, Loader, Image } from "semantic-ui-react";
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

	const sectionList = loading ? (
		<div>
			<Segment>
				<Dimmer active>
					<Loader inverted content="Loading" />
				</Dimmer>
			</Segment>
		</div>
	) : (
		sections &&
		sections.map(section => (
			<Grid.Column
				key={section.id}
				className="sectionContainer"
				style={{ marginBottom: 20 }}
			>
				<SectionCard section={section} />
			</Grid.Column>
		))
	);

	return (
		<Grid columns={3} divided>
			<Grid.Row>
				{admin && (
					<h1 className="sectionList_Header">
						Welcome {admin.username}
					</h1>
				)}
			</Grid.Row>
			<Grid.Row>{admin && sectionList}</Grid.Row>
		</Grid>
	);
};

export default Home;
