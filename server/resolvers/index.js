const adminResolvers = require("./adminResolvers");
const sectionResolvers = require("./sectionResolvers");
const studentResolvers = require("./studentResolvers");

module.exports = {
	Query: {
		...adminResolvers.Query,
		...sectionResolvers.Query,
		...studentResolvers.Query
	},
	Mutation: {
		...adminResolvers.Mutation,
		...sectionResolvers.Mutation,
		...studentResolvers.Mutation
	}
};
