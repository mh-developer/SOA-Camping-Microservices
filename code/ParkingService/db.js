// db.js
const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://mondmin:2fX1mk8K7gZBGZYq@164.8.221.27:27017/";

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