import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { LoginService } from '../login/login.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
declare var $: any;


@Injectable()
export class IncomeData {

  private url: string;
  private edit_mode: boolean = false;
  private edit_data: any[] = [];
  private edit_id: Number = null;
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
    this.headers.set('Content-Type', 'application/json');
    this.headers.set('Authorization', 'Bearer ' + this.token);
    console.log(this.headers)
    return this.http.get(
      this.url + 'income/',
      { headers: this.headers }
    )
  }

  private deleteIncomeData(id): Observable<Response> {
    this.headers.set('Content-Type', 'application/json');
    this.headers.set('Authorization', 'Bearer ' + this.token);
    console.log(this.headers)
    return this.http.delete(
      this.url + 'income/' + id,
      { headers: this.headers }
    )
  }

  private editIncomeData(id, data): Observable<Response> {
    this.headers.set('Content-Type', 'application/json');
    this.headers.set('Authorization', 'Bearer ' + this.token);
    console.log(this.headers)
    return this.http.put(
      this.url + 'income/' + id + '/',
      data,
      { headers: this.headers }
    )
  }

  private pushIncomeData(post_data): Observable<Response> {
    this.headers.set('Content-Type', 'application/json');
    this.headers.set('Authorization', 'Bearer ' + this.token);
    console.log(this.headers)
    return this.http.post(
      this.url + 'income/',
      post_data,
      {
        headers: this.headers,
        withCredentials: true
      }
    )
  }

  public deleteData(id) {
    var that = this;
    this.setToken(this.loginService.getToken());
    this.deleteIncomeData(id)
      .catch(err => {
        console.log(err);
        return Observable.throw(err);
      })
      .map(response => response.json())
      .subscribe(
      data => console.log(data),
      err => function() {
        console.error(err);
      },
      {} = function() {
        that.requestData()
      }
      );
    return this.data
  }

  public editData(id, data) {
    var that = this;
    this.setToken(this.loginService.getToken());
    this.editIncomeData(id, data)
      .catch(err => {
        console.log(err);
        return Observable.throw(err);
      })
      .map(response => response.json())
      .subscribe(
      data => console.log(data),
      err => function() {
        console.error(err);
      },
      {} = function() {
        that.requestData()
      }
      );
    return this.data
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
      err => function() {
        console.error(err);
      },
      {} = function() {
        console.log(this.data)
      }
      );
    return this.data
  }

  public getData() {
    return this.data
  }

  private setData(data) {
    this.data = data
  }

  public pushData(row) {
    var that = this;
    this.setToken(this.loginService.getToken());
    this.pushIncomeData(row)
      .catch(err => {
        console.log(err);
        return Observable.throw(err);
      })
      .map(response => response.json())
      .subscribe(
      data => console.log(data),
      err => function() {
        console.error(err);
      },
      {} = function() {
        that.requestData()
      }
      );
  }

  public setEditData(id, data) {
    this.edit_id = id;
    this.edit_data = data;
    this.edit_mode=true;
  }
  
  public getEditData(){
    return {
      edit_id: this.edit_id,
      edit_data: this.edit_data,
      edit_mode: this.edit_mode
    }
  
  }
}
