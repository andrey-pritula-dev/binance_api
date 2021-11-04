import logger from './Logger';

export const pErr = (err: Error) => {
    if (err) {
        logger.err(err);
    }
};

export const getRandomInt = () => {
    return Math.floor(Math.random() * 1_000_000_000_000);
};

export const formatData = (data: Buffer) => {
    const {price, stream, quantity} = JSON.parse(data.toString()) as {price: string, quantity: string, stream: string}
    return {
        price,
        quantity,
        marketName: stream.split('@')[0]
    }
}
