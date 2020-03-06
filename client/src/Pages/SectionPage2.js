import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
// Query
import { getSectionQuery } from "../Utilities/GraphqlQueries";

const SectionPage2 = () => {
	const { data, loading } = useQuery(getSectionQuery);
	console.log(data);

	return (
		<div>
			<h1>HELLO FROM THE SECTION2</h1>
		</div>
	);
};

export default SectionPage2;
