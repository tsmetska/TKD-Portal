import { Component, OnInit } from '@angular/core';
declare var $: any;


@Component({
  selector: 'navbar',
  templateUrl: 'navbar.component.html'
})
export class Navbar {
  title = 'Lawd Helpith Me';
  ngOnit() {
    $(".button-collapse").sideNav();
  }
}
