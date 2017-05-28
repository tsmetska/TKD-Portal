import {Component, OnInit, Input} from '@angular/core';
import {LoginService} from './login.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
declare var $: any;

@Component({
    selector: 'login',
    templateUrl: 'loginForm.component.html',
})

export class Login {

    private username: string = '';
    private password: string = '';

    constructor(public loginService: LoginService) {
    }

    ngOnInit(){
        this.showLoader(true);
        this.disableForm(true);
        var tokens = this.loginService.getStorageTokenData()
        if (!tokens['refresh_token']){
            this.showLoader(false);
            this.disableForm(false);
        } else {
            this.loginService.refreshToken()
        }
    }

    disableForm(disable) {
        if (disable) {
            $('#submit_button').addClass('disabled');
            $('#username').prop('disabled', true);
            $('#password').prop('disabled', true);
        } else {
            $('#submit_button').removeClass('disabled');
            $('#username').prop('disabled', false)
            $('#password').prop('disabled', false)
        }
    }

    showLoader(make_visible) {
        if (make_visible) {
            $('#login_loader').css('display', 'block');
        } else {
            $('#login_loader').css('display', 'none');
        }
    }

    login(){
        this.showLoader(true)
        this.loginService.loginUser(this.username, this.password)
    }

    logout(){
        this.showLoader(false)
        this.loginService.logoutUser()
    }

}
