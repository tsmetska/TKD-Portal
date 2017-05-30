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
  row_id: Number = null;
  edit_mode: boolean = false;

  check_input: Number = null;
  cash_input: Number = null;
  credit_card_input: Number = null;
  vending_input: Number = null;
  ez_payment_input: Number = null;

  grandTotal: Number = 0.00;

  constructor(private incomeData: IncomeData) {
  }

  ngOnInit() {
    var that = this;
    $('.datepicker').pickadate({
      container: 'body',
      format: 'mm/dd/yyyy',
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15 // Creates a dropdown of 15 years to control year
    });

    $('.currency').maskMoney({ prefix: '$ ' });

    $('select').material_select();

    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal').modal({ ready: function() { that.modalInit() },
    complete: function() {that.modalTearDown()}});


  }

  public onSubmit() {
    let year: string = $('.datepicker').pickadate('picker').get('highlight', 'yyyy');
    let day: string = $('.datepicker').pickadate('picker').get('highlight', 'dd');
    let month: string = $('.datepicker').pickadate('picker').get('highlight', 'mm');
    if (this.edit_mode) {
      this.incomeData.editData(this.row_id, {
        school: $('#school').val(),
        date: year + "-" + month + "-" + day,
        check: this.getTotal(this.check),
        cash: this.getTotal(this.cash),
        credit_card: this.getTotal(this.credit_card),
        vending: this.getTotal(this.vending),
        ez_payment: this.getTotal(this.ez_payment)
      });
    }
    else {
      this.incomeData.pushData({
        school: $('#school').val(),
        date: year + "-" + month + "-" + day,
        check: this.getTotal(this.check),
        cash: this.getTotal(this.cash),
        credit_card: this.getTotal(this.credit_card),
        vending: this.getTotal(this.vending),
        ez_payment: this.getTotal(this.ez_payment)
      });
    }
  }

  public submitInput(source, source_id) {
    console.log($(source_id).maskMoney('unmasked')[0]);
    source.push($(source_id).maskMoney('unmasked')[0]);
    $(source_id).val(null);
    console.log(source);
  }

  public getTotal(source) {
    var total = 0.0;
    for (let entry of source) {
      total = total + entry;
    }
    return total.toFixed(2);
  }

  public getGrandTotal() {
    var sources = [this.check, this.cash, this.credit_card, this.ez_payment, this.vending];
    var total = 0.0;
    for (let source of sources) {
      for (let entry of source) {
        total = total + entry;
      }
    }
    this.grandTotal = total;
    return this.grandTotal.toFixed(2);
  }

  public popValue(source, item) {
    source.splice(source.indexOf(item), 1);
  }

  public modalInit() {
    console.log("test");
    var dick_nater = this.incomeData.getEditData();
    if (dick_nater["edit_mode"]) {
      this.school = dick_nater["edit_data"]["school"];
      $('#school').val(dick_nater["edit_data"]["school"]);
      $('select').material_select();
      this.date = dick_nater["edit_data"]["date"];
      this.check = [dick_nater["edit_data"]["check"]];
      this.credit_card = [dick_nater["edit_data"]["credit_card"]];
      this.cash = [dick_nater["edit_data"]["cash"]];
      this.vending = [dick_nater["edit_data"]["vending"]];
      this.ez_payment = [dick_nater["edit_data"]["ez_payment"]];
      this.row_id = dick_nater["edit_data"]["id"];
      this.edit_mode = true;

    }
    else {
      this.school = null;
      this.date = null;
      this.check = [];
      this.credit_card = [];
      this.cash = [];
      this.vending = [];
      this.ez_payment = [];
      this.row_id = null;
      this.edit_mode = false;
    }
  }

  public modalTearDown() {
    this.school = null;
    this.date = null;
    this.check = [];
    this.credit_card = [];
    this.cash = [];
    this.vending = [];
    this.ez_payment = [];
    this.row_id = null;
    this.edit_mode = false;
  }

}