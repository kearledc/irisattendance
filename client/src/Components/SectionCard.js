import React from "react";
import { Link } from "react-router-dom";
// Semantic UI
import { Card, Image, Button } from "semantic-ui-react";
// moment
import moment from "moment";

const SectionCard = ({ section: { id, name, createdAt } }) => {
	return (
		<Card fluid className="sectioncard">
			<Card.Content>
				<Image
					floated="right"
					size="mini"
					src="https://react.semantic-ui.com/images/avatar/large/molly.png"
				/>
				<Card.Header as={Link} to={`/sections/${id}`} id={id}>
					{name}
				</Card.Header>
				<Card.Meta>{moment(createdAt).fromNow(true)}</Card.Meta>
				<Card.Description>Section</Card.Description>
			</Card.Content>
		</Card>
	);
};

export default SectionCard;
