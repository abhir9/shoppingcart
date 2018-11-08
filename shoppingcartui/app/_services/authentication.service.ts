/**
 * Created by abhi on 7/14/2018.
 */
import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    constructor(private http: Http) {
    }

    login(username: string, password: string) {
        let headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:5040/api/signin', JSON.stringify({
            username: username,
            password: password
        }), {headers})
            .map((response: Response) => {
                // login successful
                if (response.status == 200) {
                    let user = (response.json()).content;
                    if (user.user && user.token) {
                        localStorage.setItem('currentUser', JSON.stringify(user.user));
                        localStorage.setItem('token', user.token);
                    }
                    return user;
                }
                else if (response.status == 500) {
                }
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
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