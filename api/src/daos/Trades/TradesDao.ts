import {ITrades} from '@entities/Trades';
import UserModel from "../../db/schemas/tradesSchema";


export interface ITradesDao {
    // getAll: () => Promise<ITrades[]>;
    // add: (user: ITrades) => Promise<void>;
}

class TradesDao implements ITradesDao {

    public async getAll(limit: string, page: string): Promise<ITrades[]> {
        if (!limit) {
            limit = '100';
        }
        if (!page) {
            page = '1';
        }
        const filters = {};
        const options = {
            page: page,
            limit: +limit < 1 ? 1 : +limit > 250 ? 250 : limit,
            collation: {
                locale: "en",
            },
            sort: {name: "asc"}
        };
        return UserModel.paginate(filters, options);
    }

    /**
     *
     * @param trades
     */
    public async add(trades: ITrades): Promise<void> {
        return UserModel.create(trades);
    }

}

export default TradesDao;
