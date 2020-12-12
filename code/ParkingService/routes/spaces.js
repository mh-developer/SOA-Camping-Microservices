const express = require("express"),
	router = express.Router({ mergeParams: true }),
	ObjectId = require('mongodb').ObjectID;

const getClient = require('../db')



router.get("/", async (req, res) => {
	try {
		const client = await getClient();
		const db = client.db("parking_servce_db");
		const collection = db.collection("spaces");

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

		collection.find({ "prost": true }).toArray(function (err, docs) {
			if (err) throw err;
			res.send(docs);
		});

	} catch (err) {
		res.status(500).send('Something broke!');
	}
})


router.get("/places", async (req, res) => {
	try {
		const client = await getClient();
		const db = client.db("parking_servce_db");
		const collection = db.collection("spaces");

		const places = await collection.distinct("lokacija")
		res.send({ places });

	} catch (err) {
		res.status(500).send('Something broke!');
	}
})

router.get("/:id", async (req, res) => {
	try {
		const client = await getClient();
		const db = client.db("parking_servce_db");
		const collection = db.collection("spaces");

		collection.find({ _id: new ObjectId(req.params.id) }).toArray(function (err, result) {
			if (err) throw err;
			res.send(result);
		});

	} catch (err) {
		res.status(500).send('Something broke!');
	}
})

router.post("/", async (req, res) => {
	try {
		const client = await getClient();
		const db = client.db("parking_servce_db");
		const collection = db.collection("spaces");

		await collection.insertOne(req.body, function (err, result) {
			res.status(200).send(req.body);
		});
	} catch (err) {
		res.status(500).send('Something broke!');
	}
})

router.post("/:id", async (req, res) => {
	req.body._id = new ObjectId(req.params.id);
	try {
		const client = await getClient();
		const db = client.db("parking_servce_db");
		const collection = db.collection("spaces");

		await collection.insertOne(req.body, function (err, result) {
			res.status(200).send(req.body);
		});
	} catch (err) {
		res.status(500).send('Something broke!');
	}
})

router.put("/:id", async (req, res) => {
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
	res.status(200).json(req.params.id)
})

router.delete("/:id", async (req, res) => {
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
	res.status(200).json(req.params.id)
})



module.exports = router;