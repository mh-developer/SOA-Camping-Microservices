var express = require("express");
var router = express.Router();
let consume = require("../services/rabbitmq");
let getClient = require("../services/db");

router.get("/", async (req, res, next) => {
    try {
        const client = await getClient();
        const db = client.db("LogsDb");
        const collection = db.collection("logs");

        collection.find({}).toArray(function (err, docs) {
            if (err) throw err;
            res.send(docs);
        });
    } catch (err) {
        res.status(500).send("Something broke!");
    }
});

router.get("/:date_from/:date_to", async (req, res, next) => {
    try {
        const client = await getClient();
        const db = client.db("LogsDb");
        const collection = db.collection("logs");

        collection
            .find({
                log_date: {
                    $gte: new Date(req.params.date_from),
                    $lt: new Date(req.params.date_to),
                },
            })
            .toArray(function (err, result) {
                if (err) throw err;
                res.send(result);
            });
    } catch (err) {
        res.status(500).send("Something broke!");
    }
});

router.post("/", (req, res, next) => {
    try {
        consume().then(async (data) => {
            const client = await getClient();
            const db = client.db("LogsDb");
            const collection = db.collection("logs");

            await collection.insertMany(data, function (err, result) {
                res.status(200).send(data);
            });
        });
    } catch (err) {
        res.status(500).send("Something broke!");
    }
});

router.delete("/", async (req, res, next) => {
    try {
        const client = await getClient();
        const db = client.db("LogsDb");
        const collection = db.collection("logs");

        collection.deleteMany({}, function (err, result) {
            if (err) throw err;
            res.status(200).json("logs deleted");
        });
    } catch (err) {
        res.status(500).send("Something broke!");
    }
});

module.exports = router;
