import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NbMenuItem } from '@nebular/theme';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedIn.asObservable();

  constructor() {
    // Kiểm tra trạng thái đăng nhập khi khởi tạo service
    this.isLoggedIn.next(!!localStorage.getItem('user'));
  }

  login(userData: any) {
    localStorage.setItem('user', JSON.stringify(userData));
    this.isLoggedIn.next(true);
  }

  logout() {
    localStorage.removeItem('user');
    this.isLoggedIn.next(false);
  }

  updateMenuItems(menuItems: NbMenuItem[]) {
    menuItems.forEach(item => {
      if (item.children) {
        item.children.forEach(child => {
          if (child.title === 'Đăng nhập' || child.title === 'Đăng ký') {
            child.hidden = this.isLoggedIn.value;
          }
        });
      }
    });
    return menuItems;
  }
}