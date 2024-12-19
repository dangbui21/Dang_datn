import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedIn.asObservable();

  constructor(private router: Router) {
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
    this.router.navigate(['/pages/acc/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('user');
  }
}