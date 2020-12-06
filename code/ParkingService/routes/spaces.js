const express = require("express"),
	router = express.Router({ mergeParams: true }),
	ObjectId = require('mongodb').ObjectID;

const getClient = require('../db')



router.get("/", async (req, res) => {
	console.log(`Request to: ${req.path}`);
	try {
		const client = await getClient();
		const db = client.db("parking_servce_db");
		const collection = db.collection("spaces");

		console.log(`Collection is: ${collection}`);
		collection.find({}).toArray(function (err, docs) {
			if (err) throw err;
			console.log("Found the following records");
			console.log(docs);
			res.send(docs);
		});

	} catch (err) {
		res.status(500).send('Something broke!');
	}
})

router.get("/available", async (req, res) => {
	console.log(`Request to: ${req.path}`);
	try {
		const client = await getClient();
		const db = client.db("parking_servce_db");
		const collection = db.collection("spaces");

		console.log(`Collection is: ${collection}`);
		collection.find({ "prost": true }).toArray(function (err, docs) {
			if (err) throw err;
			console.log("Found the following records");
			console.log(docs);
			res.send(docs);
		});

	} catch (err) {
		res.status(500).send('Something broke!');
	}
})


router.get("/places", async (req, res) => {
	console.log(`Request to: ${req.path}`);
	try {
		const client = await getClient();
		const db = client.db("parking_servce_db");
		const collection = db.collection("spaces");

		console.log(`Collection is: ${collection}`);
		const places = await collection.distinct("lokacija")
		res.send({ places });

	} catch (err) {
		res.status(500).send('Something broke!');
	}
})

router.get("/:id", async (req, res) => {
	console.log(`Request to: ${req.path}`);
	try {
		const client = await getClient();
		const db = client.db("parking_servce_db");
		const collection = db.collection("spaces");

		console.log(`Collection is: ${collection}`);
		collection.find({ _id: new ObjectId(req.params.id) }).toArray(function (err, result) {
			if (err) throw err;
			console.log("Found the following records");
			console.log(result);
			res.send(result);
		});

	} catch (err) {
		res.status(500).send('Something broke!');
	}
})

router.post("/", async (req, res) => {
	console.log(`Request to: ${req.path}`);
	try {
		const client = await getClient();
		const db = client.db("parking_servce_db");
		const collection = db.collection("spaces");

		await collection.insertOne(req.body, function (err, result) {
			console.log(result);
			res.status(200).send(result.ops[0]._id);
		});
	} catch (err) {
		res.status(500).send('Something broke!');
	}
	console.log(req.body);
})

router.post("/:id", async (req, res) => {
	console.log(`Request to: ${req.path}`);
	req.body._id = new ObjectId(req.params.id);
	try {
		const client = await getClient();
		const db = client.db("parking_servce_db");
		const collection = db.collection("spaces");

		await collection.insertOne(req.body, function (err, result) {
			console.log(result);
			res.status(200).send(result);
		});
	} catch (err) {
		res.status(500).send('Something broke!');
	}
	console.log(req.body);
})

router.put("/:id", async (req, res) => {
	console.log(`Request to: ${req.url}`);
	const newValues = req.body;
	delete newValues._id;
	try {
		const client = await getClient();
		const db = client.db("parking_servce_db");
		const collection = db.collection("spaces");

		collection.updateOne({ _id: new ObjectId(req.params.id) }
			, { $set: newValues }, function (err, result) {
				if (err) throw err;
				console.log(result);
			});
	} catch (err) {
		res.status(500).send('Something broke!');
	}
	console.log(req.params.id);
	res.status(200).json(req.params.id)
})

router.delete("/:id", async (req, res) => {
	console.log(`Request to: ${req.url}`);
	const newValues = req.body;
	delete newValues._id;
	try {
		const client = await getClient();
		const db = client.db("parking_servce_db");
		const collection = db.collection("spaces");

		collection.deleteOne({ _id: new ObjectId(req.params.id) }
			, { $set: newValues }, function (err, result) {
				if (err) throw err;
				console.log(result);
			});
	} catch (err) {
		res.status(500).send('Something broke!');
	}
	console.log(req.params.id);
	res.status(200).json(req.params.id)
})



module.exports = router;