import {Component, ViewChild} from '@angular/core';
import {LoginService} from '../login/login.service';
import {Login} from '../login/loginForm.component';

declare var $: any;


@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css']
})
export class AppComponent {
    title = 'Lawd Helpith Me';
    flag: boolean = false;
    private logged_in: boolean = false;

    constructor(public loginService: LoginService) {}

    public openModal() {
        console.log("boop");
        $('#income-form-modal').modal('open');
    }

    public showIncomeTable() {
        return this.flag;
    }

    public toggleIncomeTableVisible() {
        this.flag = !this.flag;
        return this.flag;
    }

    public getLoginState() {
        return this.loginService.getLoginState()
    }
}
