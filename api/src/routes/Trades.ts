import StatusCodes from 'http-status-codes';
import {Request, Response} from 'express';

import TradesDao from '@daos/Trades/TradesDao';

const tradesDao = new TradesDao();
const {OK} = StatusCodes;

/**
 * Get all trades.
 *
 * @param req
 * @param res
 * @returns
 */
export async function getTrades(req: Request, res: Response) {
    const {limit, page} = req.params;
    const trades = await tradesDao.getAll(limit, page);
    return res.status(OK).json({trades});
}
