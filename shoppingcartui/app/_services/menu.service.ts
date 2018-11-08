/**
 * Created by abhi on 7/14/2018.
 */
import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {Menu} from '../_models/index';

@Injectable()
export class MenuService {
    apiUrl: string;

    constructor(private http: Http) {
        this.apiUrl = 'http://localhost:5040/api';
    }

// get all menus
    getAll() {
        return this.http.get(this.apiUrl + '/menu', this.headers()).map((response: Response) => {
            return response.json().content.menus
        });
    }

// get menu by id
    getById(id: number) {
        return this.http.get(this.apiUrl + '/menu' + id, this.headers()).map((response: Response) => response.json());
    }

// create menu
    create(menu: Menu) {
        let headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(this.apiUrl + '/menu', JSON.stringify(menu), {headers}).map((response: Response) => response.json());
    }

// update menu by id
    update(menu: Menu) {
        console.log(menu);
        return this.http.put(this.apiUrl + '/menu/' + menu._id, JSON.stringify(menu), this.headers()).map((response: Response) => response.json());
    }

// delete menu by id
    delete(id: number) {
        return this.http.delete(this.apiUrl + '/menu/' + id, this.headers()).map((response: Response) => response.json());
    }

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