import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../../@core/services/auth.service';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading: boolean = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder, 
    private http: HttpClient, 
    private router: Router,
    private authService: AuthService,
    private toastrService: NbToastrService
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
      this.loading = true;
      this.errorMessage = '';
      this.http.post('http://localhost:3000/acc/login', this.loginForm.value)
        .subscribe({
          next: (response: any) => {
            if (response.success) {
              this.authService.login(response);
              
              // Hiển thị thông báo thành công
              this.toastrService.success('Đăng nhập thành công', 'Thành công');
              
              // Hiển thị cảnh báo nếu tài khoản inactive
              if (response.warning) {
                this.toastrService.warning(response.warning, 'Cảnh báo');
              }
              
              this.router.navigate(['/pages/stock-market']);
            }
          },
          error: (error) => {
            if (error.status === 401) {
              this.errorMessage = 'Email hoặc mật khẩu không chính xác';
            } else if (error.status === 403) {
              this.errorMessage = error.error.message || 'Tài khoản của bạn đã bị cấm';
            } else {
              this.errorMessage = 'Có lỗi xảy ra';
            }
            this.toastrService.danger(this.errorMessage, 'Lỗi');
            this.loading = false;
          },
          complete: () => {
            this.loading = false;
          }
        });
    }
  }
}