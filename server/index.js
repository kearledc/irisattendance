const mongoose = require("mongoose");
const server = require("./config");
const { MONGODB } = require("./configuration");

mongoose
	.connect(MONGODB, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false
	})
	.then(() => {
		console.log("Welcome Maam Iris");
		return server.listen({ port: 3001 });
	})
	.then(res => console.log(`I love you ${res.port}`))
	.catch(err => console.log(err));
