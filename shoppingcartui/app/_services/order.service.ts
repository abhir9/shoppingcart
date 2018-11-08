/**
 * Created by abhi on 7/14/2018.
 */
import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {Order} from '../_models/index';

@Injectable()
export class OrderService {
    apiUrl: string;

    constructor(private http: Http) {
        this.apiUrl = 'http://localhost:5040/api';
    }

// get all orders
    getAll() {
        return this.http.get(this.apiUrl + '/order', this.headers()).map((response: Response) => {
            return response.json().content.orders
        });
    }

// // get order by id
//     getById(id: number) {
//         return this.http.get(this.apiUrl+'/order' + id, this.headers()).map((response: Response) => response.json());
//     }
// create order
    create(order: Order) {
        let headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(this.apiUrl + '/order', JSON.stringify(order), {headers}).map((response: Response) => response.json());
    }

// // update order by id
//     update(order: Order) {
//         console.log(order);
//         return this.http.put(this.apiUrl+'/order/' + order._id, JSON.stringify(order), this.headers()).map((response: Response) => response.json());
//     }
// // delete order by id
//     delete(id: number) {
//         return this.http.delete(this.apiUrl+'/order/' + id, this.headers()).map((response: Response) => response.json());
//     }
// setting headers
    private headers() {
        if (localStorage.getItem('token')) {
            return new RequestOptions({
                headers: new Headers({
                    'Authorization': localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                })
            });
        }
    }
}