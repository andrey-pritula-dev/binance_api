import { IUser } from "@entities/Trades";

declare module 'express' {
    export interface Request  {
        body: {
            user: IUser
        };
    }
}
