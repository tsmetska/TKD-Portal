import {Component} from '@angular/core';

import {IncomeData} from './incomeData.service';

declare var $: any;
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
  
  public deleteData(id){
    this.incomeData.deleteData(id);
  }
  
  public editData(id,data){
    this.incomeData.setEditData(id,data);
    $('#income-form-modal').modal('open');
}
  
  
  
}
