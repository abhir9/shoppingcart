/**
 * Created by abhi on 7/14/2018.
 */
import {User} from "./user";

export class Order {
    category: Array<{ name: string, items: object }>;
    total: number;
    user: User;
    coupon: string;
}