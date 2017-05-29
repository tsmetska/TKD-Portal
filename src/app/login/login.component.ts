import { Component } from '@angular/core';

import { LoginService } from './login.service';

import {OnInit} from '@angular/core';

declare var $:any;

@Component({
  selector: 'login',
  templateUrl: './login.component.html'
})
export class Login 
{
	ngOnInit()
	{
		console.log("init");
		$('.modal').modal();
	}
	
}