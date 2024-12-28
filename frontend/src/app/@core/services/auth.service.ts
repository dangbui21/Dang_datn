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
    // Kiểm tra trạng thái đăng nhập khi khởi tạo service
    const userData = localStorage.getItem('user');
    if (userData) {
      this.currentUser = JSON.parse(userData);
      this.isLoggedIn.next(true);
    }
  }

  login(userData: any) {
    this.currentUser = userData.user || userData; // Tùy thuộc vào response format
    localStorage.setItem('user', JSON.stringify(this.currentUser));
    this.isLoggedIn.next(true);
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('user');
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