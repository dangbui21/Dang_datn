import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {}

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
        .subscribe(response => {
          console.log('User registered:', response);

          this.successMessage = 'Đăng ký thành công!';
          this.errorMessage = '';
          this.router.navigate(['/login']);
        }, error => {
            console.error('Error registering user:', error);
          // Xử lý lỗi
          this.errorMessage = 'Đăng ký thất bại: ' + error.error;
          this.successMessage = '';
        });
    }
  }
}