import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { Navbar } from './navbar.component';
import { IncomeTable } from './incomeTable.component';
import { IncomeData } from './incomeData.service';
import { IncomeForm } from './incomeForm.component';
import { LoginService } from './login/login.service';

@NgModule({
  declarations: [
    AppComponent,
	Navbar,
	IncomeTable,
	IncomeForm
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
export class AppModule { }
