const express = require("express"),
	router = express.Router({ mergeParams: true }),
	ObjectId = require("mongodb").ObjectID;
const logger = require("../logger");

const getClient = require("../db");

let welcome_string = "Welcome to AbusementPark! We hope you enjoy your stay! If you have any questions please contact Marko!"

router.get("/", async (req, res) => {
	try {
		const client = await getClient();
		const db = client.db("CheckInService");
		const collection = db.collection("posts");

		collection.find({}).toArray(function (err, docs) {
			if (err) throw err;
			console.log("Found the following records");
			console.log(docs);
			logger(Date.now(), "INFO", req, "14", "AbusementPark", "Uspešen GET request");
			res.send(docs);
		});
	} catch (err) {
		logger(Date.now(), "ERROR", req, "14", "AbusementPark", "Neuspešen GET request, sending 500");
		res.status(500).send("Something broke!");
	}
});

router.get("/informations", async (req, res) => {
	console.log(`Request to: ${req.path}`);
	try {
		const client = await getClient();
		const db = client.db("CheckInService");
		const collection = db.collection("posts");
		res.send(welcome_string);

	} catch (err) {
		logger(Date.now(), "ERROR", req, "14", "AbusementPark", "Neuspešen GET request, sending 500");
		res.status(500).send("Something broke!");
	}
});



//done
router.get("/:id", async (req, res) => {
	try {
		const client = await getClient();
		const db = client.db("CheckInService");
		const collection = db.collection("posts");

		collection
			.find({ _id: new ObjectId(req.params.id) })
			.toArray(function (err, result) {
				if (err) throw err;
				logger(Date.now(), "INFO", req, "14", "AbusementPark", "Uspešen GET request");
				res.send(result);
			});
	} catch (err) {
		logger(Date.now(), "ERROR", req, "14", "AbusementPark", "Neuspešen GET request, sending 500");
		res.status(500).send("Something broke!");
	}
});

router.get("/:name", async (req, res) => {
	try {
		const client = await getClient();
		const db = client.db("CheckInService");
		const collection = db.collection("posts");

		collection
			.find({ name: new ObjectId(req.params.name) })
			.toArray(function (err, result) {
				if (err) throw err;
				logger(Date.now(), "INFO", req, "14", "AbusementPark", "Uspešen GET request");
				res.send(result);
			});
	} catch (err) {
		logger(Date.now(), "ERROR", req, "14", "AbusementPark", "Neuspešen GET request, sending 500");
		res.status(500).send("Something broke!");
	}
});

router.post("/", async (req, res) => {
	try {
		const client = await getClient();
		const db = client.db("CheckInService");
		const collection = db.collection("posts");

		await collection.insertOne(req.body, function (err, result) {
			logger(Date.now(), "INFO", req, "14", "AbusementPark", "Uspešen POST request");
			res.status(200).send(req.body);
		});
	} catch (err) {
		logger(Date.now(), "ERROR", req, "14", "AbusementPark", "Neuspešen POST request, sending 500");
		res.status(500).send("Something broke!");
	}
});

router.post("/:id", async (req, res) => {
	req.body._id = new ObjectId(req.params.id);
	try {
		const client = await getClient();
		const db = client.db("CheckInService");
		const collection = db.collection("posts");

		await collection.insertOne(req.body, function (err, result) {
			logger(Date.now(), "INFO", req, "14", "AbusementPark", "Uspešen POST request");
			res.status(200).send(req.body);
		});
	} catch (err) {
		logger(Date.now(), "ERROR", req, "14", "AbusementPark", "Neuspešen POST request, sending 500");
		res.status(500).send("Something broke!");
	}
});

router.put("/:id", async (req, res) => {
	const newValues = req.body;
	delete newValues._id;
	try {
		const client = await getClient();
		const db = client.db("CheckInService");
		const collection = db.collection("posts");

		collection.updateOne(
			{ _id: new ObjectId(req.params.id) },
			{ $set: newValues },
			function (err, result) {
				if (err) throw err;
				console.log(result);
			}
		);
	} catch (err) {
		logger(Date.now(), "ERROR", req, "14", "AbusementPark", "Neuspešen PUT request, sending 500");
		res.status(500).send("Something broke!");
	}
	logger(Date.now(), "INFO", req, "14", "AbusementPark", "Uspešen PUT request");
	res.status(200).json(req.params.id);
});

router.delete("/:id", async (req, res) => {
	const newValues = req.body;
	delete newValues._id;
	try {
		const client = await getClient();
		const db = client.db("CheckInService");
		const collection = db.collection("posts");

		collection.deleteOne(
			{ _id: new ObjectId(req.params.id) },
			{ $set: newValues },
			function (err, result) {
				if (err) throw err;
				console.log(result);
			}
		);
	} catch (err) {
		logger(Date.now(), "ERROR", req, "14", "AbusementPark", "Neuspešen DELETE request, sending 500");
		res.status(500).send("Something broke!");
	}
	logger(Date.now(), "INFO", req, "14", "AbusementPark", "Uspešen DELETE request");
	res.status(200).json(req.params.id);
});

module.exports = router;
