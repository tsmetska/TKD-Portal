import {Component} from '@angular/core';

import {IncomeData} from './incomeData.service';

@Component({
    selector: 'income-table',
    templateUrl: 'incomeTable.component.html'
})
export class IncomeTable {
    constructor(private incomeData: IncomeData) {
        this.incomeData.requestData()
    }

    public getData() {
        return this.incomeData.getData();
    }
}
