import { Component, OnInit } from '@angular/core';
import { MenuItems } from './pages-menu';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'ngx-pages',
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent implements OnInit {
  menu: NbMenuItem[] = [];

  constructor(private menuItems: MenuItems) {}

  ngOnInit() {
    this.menuItems.menuItems$.subscribe(items => {
      this.menu = items;
    });
  }
}
