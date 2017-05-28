import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {Navbar} from '../navbar/navbar.component';
import {IncomeTable} from '../incomeTable/incomeTable.component';
import {IncomeData} from '../incomeData.service';
import {IncomeForm} from '../incomeForm/incomeForm.component';
import {LoginService} from '../login/login.service';
import {Login} from '../login/loginForm.component';
import {LogoutButton} from '../login/logoutButton.component';

@NgModule({
    declarations: [
        AppComponent,
        Navbar,
        IncomeTable,
        IncomeForm,
        Login,
        LogoutButton
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule
    ],
    providers: [
        IncomeData,
        LoginService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
