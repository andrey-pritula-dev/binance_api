import {Router} from 'express';
import {getTrades} from './Trades';

// Export the base-router
const baseRouter = Router();
baseRouter.get('/trades', getTrades);
baseRouter.get('/trades/limit/:limit/page/:page', getTrades);
export default baseRouter;
