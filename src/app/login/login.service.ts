import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {IncomeData} from '../incomeData/incomeData.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
declare var $: any;

@Injectable()
export class LoginService {

    private url: string;
    private client_id: string;
    private logged_in: boolean = false;
    private token: string;
    private refresh_token: string;

    private username: string;
    private password: string;

    constructor(private http: Http) {
        this.client_id = $("meta[name=client_id]").attr("content");
        var url = window.location.href;
        if (url[url.length - 6] == ':') {
            url = "http://localhost:8000/"
        }
        this.url = url
        this.url = 'https://tkdportal.herokuapp.com/'
    }

    headers = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
    });

    getToken(){
        return this.token
    }

    getClientID(){
        return this.client_id
    }

    getURL(){
        return this.url
    }

    authUser(username: string, password: string): Observable<Response> {
        let data = {
            username: username,
            password: password,
            grant_type: 'password',
            client_id: this.client_id
        };
        this.headers.set('Content-Type', 'application/x-www-form-urlencoded');
        return this.http.post(
            this.url + 'o/token/',
            JSON.stringify(data),
            {headers: this.headers}
        )
    }

    setTokenData(data) {
        console.log("Setting Token...");
        this.token = data['access_token'];
        this.refresh_token = data['refresh_token'];

        console.log("Token: ", this.token)

        localStorage.setItem('current_token', this.token);
        localStorage.setItem('refresh_token', this.refresh_token);
    }

    getStorageTokenData() {
        return {
            'current_token': localStorage.getItem('current_token'),
            'refresh_token': localStorage.getItem('refresh_token'),
        }
    }

    loginUser(username, password) {
        this.username = username;
        this.password = password;
        var that = this;
        this.authUser(this.username, this.password)
            .catch(err => {
                console.log(err)
                return Observable.throw(err);
            })
            .map(response => response.json())
            .subscribe(
                data => this.setTokenData(data),
                err => function () {
                    console.error(err);
                },
                {} = function () {
                    that.setLoginState(true)
                }
            )
    }


    refreshTokenString(token): Observable<Response> {
        let data = {
            refresh_token: token,
            grant_type: 'refresh_token',
            client_id: this.client_id
        };
        this.headers.set('Content-Type', 'application/json');
        return this.http.post(
            this.url + 'o/token/',
            JSON.stringify(data),
            {headers: this.headers}
        )
    }

    refreshToken() {
        var that = this;
        var token = this.getStorageTokenData()['refresh_token'];
        this.refreshTokenString(token)
            .catch(err => {
                that.delTokenData();
                console.log(err)
                return Observable.throw(err);
            })
            .map(response => response.json())
            .subscribe(
                data => {
                    this.setTokenData(data);
                },
                err => function () {
                    that.delTokenData();
                    console.error(err);
                },
                {} = function () {
                    that.setLoginState(true)
                }
            )
    }

    logoutUser() {
        var that = this;
        this.delTokenData()
        this.delToken()
            .subscribe(
                data => {},
                error => console.error(error),
                () => {
                    that.delToken();
                    that.setLoginState(false);
                }
            )
    }

    delTokenData() {
        this.token = null;
        this.refresh_token = null;
        localStorage.removeItem('current_token');
        localStorage.removeItem('refresh_token');
        return this.token
    }

    delToken(): Observable<Response> {
        let data = {
            token: this.token,
            client_id: this.client_id
        };
        this.headers.set('Content-Type', 'application/json');
        return this.http.post(
            this.url + 'o/revoke_token/',
            JSON.stringify(data),
            {headers: this.headers}
        )
    }

    public setLoginState(state) {
        this.logged_in = state;
    }

    public getLoginState() {
        return this.logged_in
    }
}
