import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ngx-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.changePasswordForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('newPassword').value === form.get('confirmPassword').value 
      ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.changePasswordForm.valid) {
      console.log(this.changePasswordForm.value);
      // Xử lý logic thay đổi mật khẩu tại đây
    }
  }
}