import { Component } from '@angular/core';

import { OnInit } from '@angular/core';

import { IncomeData } from './incomeData.service';

declare var $: any;

@Component({
  selector: 'income-form',
  templateUrl: 'incomeForm.component.html'
})
export class IncomeForm {
  school: String = "";
  date: Date = null;
  check: any[] = [];
  cash: any[] = [];
  credit_card: any[] = [];
  vending: any[] = [];
  ez_payment: any[] = [];

  check_input: Number = null;
  cash_input: Number = null;
  credit_card_input: Number = null;
  vending_input: Number = null;
  ez_payment_input: Number = null;
  
  total: Number = 0.00;
  grandTotal: Number = 0.00;

  constructor(private incomeData: IncomeData) {
  }

  ngOnInit() {
    $('.datepicker').pickadate({
      container: 'body',
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15 // Creates a dropdown of 15 years to control year
    });
  
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();
    
    $('#currency').maskMoney({prefix:'$ '});
  }

  public onSubmit() {
    this.incomeData.putData({
      school: this.school,
      date: this.date,
      check: this.check,
      cash: this.cash,
      creditCard: this.credit_card,
      vending: this.vending,
      ezPayment: this.ez_payment
    });
  }

  public submitInput(source, source_input) {
    console.log("boats and chocobos");
    source.push(source_input);
    source_input = null;
    console.log(source);
  }
  
  public getTotal(source)
  {
    for (let entry of source) 
    {
      this.total = this.total + entry;
    }
  }

}