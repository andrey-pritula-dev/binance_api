import {logFormater} from "./helpers/logFormater";

const WS = require('ws');
require('dotenv').config();
const amqp = require('amqplib/callback_api');
const {BINANCE_API_URL, REBBITMQ_URL, REBBITMQ_QUEUE_NAME} = process.env;
import {IApiResponse} from "./interfaces";

try {
    amqp.connect(REBBITMQ_URL, (connectError, connection) => {
        if (connectError) {
            throw connectError;
        }
        connection.createChannel((chanelError, channel) => {
            if (chanelError) {
                throw chanelError;
            }

            channel.assertQueue(REBBITMQ_QUEUE_NAME, {
                durable: false
            });

            const wsCon = new WS(`${BINANCE_API_URL}stream?streams=ethbtc@aggTrade`);
            wsCon.onopen = () => {
                logFormater('Connected');
            };
            wsCon.onclose = () => {
                logFormater('Connection closed');
            };
            wsCon.onerror = () => {
                throw new Error('Connection Error')
            };
            wsCon.onmessage = (message: MessageEvent) => {
                const parsedMessage = JSON.parse(message.data) as IApiResponse;
                const msg = JSON.stringify({
                    price: parsedMessage.data.p,
                    quantity: parsedMessage.data.q,
                    stream: parsedMessage.stream
                });
                channel.sendToQueue(REBBITMQ_QUEUE_NAME, Buffer.from(msg));
                console.log(" [x] Sent %s", msg);
            };
        });
    });
} catch (e) {
    console.log(e)
}

