/**
 * Created by abhi on 7/14/2018.
 */
import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {User} from '../_models/index';

@Injectable()
export class UserService {
    apiUrl: string;

    constructor(private http: Http) {
        this.apiUrl = 'http://localhost:5040/api';
    }

// get all users
    getAll() {
        return this.http.get(this.apiUrl + '/user', this.headers()).map((response: Response) => response.json().content.users);
    }

// get user by id
    getById(id: number) {
        return this.http.get(this.apiUrl + '/user' + id, this.headers()).map((response: Response) => response.json());
    }

// create user
    create(user: User) {
        let headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post(this.apiUrl + '/signup', JSON.stringify(user), {headers}).map((response: Response) => response.json());
    }

// update user by id
    update(user: User) {
        return this.http.put(this.apiUrl + '/user/' + user._id, JSON.stringify(user), this.headers()).map((response: Response) => response.json());
    }

// delete user by id
    delete(id: number) {
        return this.http.delete(this.apiUrl + '/user/' + id, this.headers()).map((response: Response) => response.json());
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