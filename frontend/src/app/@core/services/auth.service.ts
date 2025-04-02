import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

interface User {
  id: number;
  email: string;
  username: string;
  // thêm các trường khác nếu cần
}
@Injectable({         
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedIn.asObservable();
  private currentUser: User | null = null;

  constructor(private router: Router) {
    // Kiểm tra cả user và token khi khởi tạo
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (userData && token) {
      this.currentUser = JSON.parse(userData);
      this.isLoggedIn.next(true);
    }
  }

  login(response: any) {
    this.currentUser = response.user;
    localStorage.setItem('user', JSON.stringify(response.user));
    localStorage.setItem('token', response.token); // Lưu token
    this.isLoggedIn.next(true);
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('user');
    localStorage.removeItem('token'); // Xóa token
    this.isLoggedIn.next(false);
    this.router.navigate(['/pages/acc/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('user');
  }

  // Thêm phương thức để lấy userId
  getUserId(): number | null {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      return user.id;
    }
    return null;
  }

  // Thêm phương thức để lấy thông tin user hiện tại
  getCurrentUser(): User | null {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  }
}