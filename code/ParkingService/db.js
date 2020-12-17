// db.js
const MongoClient = require("mongodb").MongoClient;

const url = "mongodb+srv://soa-user:soavaje2020@cluster0.cymie.mongodb.net/parking_servce_db?retryWrites=true&w=majority";

var client;

const getClient = async () => {
	if (client && client.isConnected()) {
		console.log("DB CLIENT ALREADY CONNECTED");
	} else
		try {
			client = await MongoClient.connect(url, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			});
			console.log("DB CLIENT RECONNECTED");
		} catch (e) {
			throw e;
		}
	console.log(client);
	return client;
};

module.exports = getClient;