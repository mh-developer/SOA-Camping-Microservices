var rabbit_user = "student";
var rabbit_pwd = "student123";
var rabbit_host = "studentdocker.informatika.uni-mb.si";
var rabbit_port = "5672";
var vhost = "";

let amqp = require("amqplib"),
    EventEmitter = require("events"),
    eventEmitter = new EventEmitter(),
    timeout = 4000,
    configConnection = `amqp://${rabbit_user}:${rabbit_pwd}@${rabbit_host}:${rabbit_port}/${vhost}`,
    queue = "SIPIA-4-Logging",
    exchange = "SIPIA-4",
    type = "direct";

async function consume() {
    let conn = await amqp.connect(configConnection, "heartbeat=60");
    let channel = await conn.createChannel();
    await channel.assertExchange(exchange, type);
    let response = await channel.assertQueue(queue, { durable: true });

    let messageCount = response.messageCount;
    let messages = [];
    response = await channel.bindQueue(response.queue, exchange, "");
    response = await channel.consume(response.queue, logMessage(messageCount), {
        noAck: true,
    });

    setTimeout(() => {
        eventEmitter.emit("consumeDone");
        channel.close();
        conn.close();
    }, timeout);
    await new Promise((resolve) => eventEmitter.once("consumeDone", resolve));
    console.log("reading for query finish");

    function logMessage(messageCount) {
        return (msg) => {
            const message = msg.content.toString();
            let log_date = message.substring(0, 23);
            console.log("[*] recieved: '%s'", message);
            messages.push({
                datetime: new Date(),
                log_date: new Date(log_date.replace(",", ".")),
                message: message,
            });
            if (messageCount == msg.fields.deliveryTag) {
                eventEmitter.emit("consumeDone");
            }
        };
    }
    return messages;
}

module.exports = consume;
