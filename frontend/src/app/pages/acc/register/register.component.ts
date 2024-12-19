import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder, 
    private http: HttpClient, 
    private router: Router,
    private toastrService: NbToastrService
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email, this.gmailValidator]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      terms: [false, [Validators.requiredTrue]]
    }, { validator: this.passwordMatchValidator });
  }

  gmailValidator(control) {
    const email = control.value;
    if (email && !email.endsWith('@gmail.com')) {
      return { invalidEmail: true };
    }
    return null;
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password').value === form.get('confirmPassword').value 
      ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.http.post('http://localhost:3000/acc/register', this.registerForm.value)
        .subscribe(
          (response: any) => {
            console.log('User registered:', response);
            this.successMessage = 'Đăng ký thành công!';
            this.errorMessage = '';
            
            this.toastrService.success('Đăng ký thành công!', 'Thành công', { duration: 3000 });
            
            setTimeout(() => {
              this.router.navigate(['/pages/acc/login']);
            }, 1500);
          },
          error => {
            console.error('Error registering user:', error);
            
            if (error.status === 400) {
              this.errorMessage = 'Tên đăng nhập hoặc email đã tồn tại';
              this.toastrService.warning(
                'Tên đăng nhập hoặc email đã tồn tại',
                'Cảnh báo',
                { duration: 3000 }
              );
            } else if (error.status === 201) {
              this.successMessage = 'Đăng ký thành công!';
              this.errorMessage = '';
              this.toastrService.success('Đăng ký thành công!', 'Thành công', { duration: 3000 });
              setTimeout(() => {
                this.router.navigate(['/pages/acc/login']);
              }, 1500);
            } else {
              this.errorMessage = 'Có lỗi xảy ra trong quá trình đăng ký';
              this.toastrService.danger(
                'Có lỗi xảy ra trong quá trình đăng ký',
                'Lỗi',
                { duration: 3000 }
              );
            }
            this.successMessage = '';
          }
        );
    }
  }
}