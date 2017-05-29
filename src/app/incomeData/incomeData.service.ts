import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {LoginService} from '../login/login.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
declare var $: any;


@Injectable()
export class IncomeData {

    private url: string;
    private client_id: string;
    private token: string;
    private headers = new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
    });

    constructor(private http: Http, private loginService: LoginService) {
        this.client_id = this.loginService.getClientID();
        this.url = this.loginService.getURL();
        console.log(this.loginService.getToken())
    }

    private data: any[] = [];

    public setToken(token) {
        this.token = token;
        this.headers.set('Authorization', 'Bearer ' + this.token)
    }

    private getIncomeData(): Observable<Response> {
        console.log("!!!")
        this.headers.set('Content-Type', 'application/json');
        this.headers.set('Authorization', 'Bearer ' + this.token);
        console.log(this.headers)
        return this.http.get(
            this.url + 'income/',
            {headers: this.headers}
        )
    }

    public requestData() {
        this.setToken(this.loginService.getToken());
        this.getIncomeData()
            .catch(err => {
                console.log(err);
                return Observable.throw(err);
            })
            .map(response => response.json())
            .subscribe(
                data => this.setData(data['results']),
                err => function () {
                    console.error(err);
                },
                {} = function () {
                    console.log(this.data)
                }
            );
        return this.data
    }

    public getData() {
        return this.data
    }

    private setData(data){
        this.data = data
    }

    public pushData(row) {
      console.log(row);
    }
}
