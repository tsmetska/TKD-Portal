import {Component, OnInit, Input} from '@angular/core';
import {LoginService} from './login.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
declare var $: any;

@Component({
    selector: 'logout-button',
    templateUrl: 'logoutButton.component.html',
})

export class LogoutButton {

    constructor(public loginService: LoginService) {
    }

    logout(){
        this.loginService.logoutUser()
    }

}
