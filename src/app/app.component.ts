import { Component } from '@angular/core';

declare var $:any;



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent 
{
  title = 'Lawd Helpith Me';
  flag:boolean = false;
  
  public openModal()
  {
	  console.log("boop");
	  $('#income-form-modal').modal('open');
  }
  
  public showIncomeTable()
  {
	  return this.flag;
  }
  
  public toggleIncomeTableVisible()
  {
	  this.flag = !this.flag;
	  return this.flag;
  }
}
