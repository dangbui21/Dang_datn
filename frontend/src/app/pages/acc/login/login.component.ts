import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../../@core/services/auth.service';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = ''; // Thêm biến để lưu thông báo thành công

  constructor(
    private fb: FormBuilder, 
    private http: HttpClient, 
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, this.gmailValidator]],
      password: ['', [Validators.required]]
    });
  }

  gmailValidator(control) {
    const email = control.value;
    if (email && !email.endsWith('@gmail.com')) {
      return { invalidEmail: true };
    }
    return null;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.http.post('http://localhost:3000/acc/login', this.loginForm.value)
        .subscribe({
          next: (response: any) => {
            console.log('Đăng nhập thành công:', response);
            this.successMessage = 'Đăng nhập thành công!';
            this.authService.login(response); // Lưu thông tin user vào AuthService
            this.router.navigate(['/pages/stock-market']);
          },
          error: (error) => {
            this.errorMessage = 'Thông tin tài khoản hoặc mật khẩu không chính xác';
            console.error('Lỗi đăng nhập:', error);
          }
        });
    }
  }
}