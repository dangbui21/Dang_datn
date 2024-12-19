import { Component, OnInit } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';
import { AuthService } from '../@core/services/auth.service';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent implements OnInit {

  menu = MENU_ITEMS;

  constructor(private authService: AuthService) {
    this.authService.isLoggedIn$.subscribe(() => {
      this.menu = this.authService.updateMenuItems([...MENU_ITEMS]);
    });
  }

  ngOnInit() {
  }
}
