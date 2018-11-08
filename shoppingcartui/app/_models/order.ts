/**
 * Created by abhi .
 */
import {User} from "./user";

export class Order {
    category: Array<{ name: string, items: object }>;
    total: number;
    user: User;
    coupon: string;
}