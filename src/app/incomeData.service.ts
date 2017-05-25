import { Injectable } from '@angular/core';

@Injectable()
export class IncomeData
{
	private data: any[] =  
	[
	  
	];
	
	public getData()
	{
		return this.data;
	}
	
	public putData(row)
	{
		this.data.push(row);
	}
}
