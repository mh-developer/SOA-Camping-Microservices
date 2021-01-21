const amqplib = require('amqplib');
const assert = require('assert');
const { timeStamp } = require('console');
const util = require('util');
const url = require('url');



const rabbit_user = "student";
const rabbit_pwd = "student123";
const rabbit_host = "studentdocker.informatika.uni-mb.si";
const rabbit_port = "5672";
const vhost = "";


module.exports = async function produce(timestamp, type, req, correlationId, applicationName = 'AbusementPark', message) {
	const amql_url = util.format("amqp://%s:%s@%s:%s/%s", rabbit_user, rabbit_pwd, rabbit_host, rabbit_port, vhost);

	console.log("Publishing");
	const conn = await amqplib.connect(amql_url, "heartbeat=60");
	const ch = await conn.createChannel()
	const exch = 'SIPIA-4';
	const q = 'SIPIA-4-Logging';
	const rkey = 'SIPIA-4-Logging';
	await ch.assertExchange(exch, 'direct', { durable: true }).catch(console.error);
	await ch.assertQueue(q, { durable: true });
	await ch.bindQueue(q, exch, rkey);

	const fullUrl = getFullUrl(req)
	const msg = `${timestamp} ${type} ${fullUrl} Correlation: ${correlationId} ${applicationName} - ${message}`;
	await ch.publish(exch, rkey, Buffer.from(msg));
	setTimeout(function () {
		ch.close();
		conn.close();
	}, 500);
}

function getFullUrl(req) {
	return url.format({
		protocol: req.protocol,
		host: req.get('host'),
		pathname: req.originalUrl
	});
}