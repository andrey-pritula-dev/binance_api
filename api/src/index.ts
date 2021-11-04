import './pre-start'; // Must be the first import
import app from '@server';
import logger from '@shared/Logger';
import initDB from './db';
import {formatData} from "@shared/functions";
import TradesDao from "@daos/Trades/TradesDao";

const amqp = require('amqplib/callback_api');
const {PORT, REBBITMQ_URL, REBBITMQ_QUEUE_NAME} = process.env;

const port = Number(PORT || 8001);

app.listen(port, () => {
    logger.info('Express server started on port: ' + port);
    initDB();
    try {
        amqp.connect(REBBITMQ_URL, (connectionError: any, connection: { createChannel: (arg0: (channelError: any, channel: any) => void) => void; }) => {
            if (connectionError) {
                throw connectionError;
            }
            connection.createChannel((channelError, channel) => {
                if (channelError) {
                    throw channelError;
                }

                channel.assertQueue(REBBITMQ_QUEUE_NAME, {
                    durable: false
                });
                const tradesDao = new TradesDao();
                console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", REBBITMQ_QUEUE_NAME);
                channel.consume(REBBITMQ_QUEUE_NAME, (msg: { content: any; }) => {
                    const msgData = formatData(msg.content);
                    tradesDao.add(msgData);
                    console.log(" [x] Received %s", msg.content.toString());

                }, {noAck: true});
            });
        });
    } catch (e) {
        console.log(e)
    }
});
