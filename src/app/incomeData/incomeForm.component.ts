import {Component} from '@angular/core';

import {OnInit} from '@angular/core';

import {IncomeData} from './incomeData.service';

declare var $: any;

@Component({
    selector: 'income-form',
    templateUrl: 'incomeForm.component.html'
})
export class IncomeForm {
    id: String = "";
    school: String = "";
    date: Date = null;
    check: String = "";
    cash: String = "";
    credit_card: String = "";
    vending: String = "";
    ez_payment: String = "";


    constructor(private incomeData: IncomeData) {
    }

    ngOnInit() {
        $('.datepicker').pickadate({
            selectMonths: true, // Creates a dropdown to control month
            selectYears: 15 // Creates a dropdown of 15 years to control year
        });


        // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
        $('.modal').modal();

    }

    public onSubmit() {
        this.incomeData.putData({
            id: this.id,
            school: this.school,
            date: this.date,
            check: this.check,
            cash: this.cash,
            creditCard: this.credit_card,
            vending: this.vending,
            ezPayment: this.ez_payment
        });
    }

}