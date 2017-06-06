import {Component} from '@angular/core';

import {IncomeData} from './incomeData.service';

import Chart from 'chart.js';

declare var $: any;
@Component({
    selector: 'income-chart',
    templateUrl: 'incomeChart.component.html'
})
export class IncomeChart {
    constructor(private incomeData: IncomeData) {
        this.incomeData.requestData()
    }

    public getData() {
        return this.incomeData.getData();
    }
 }