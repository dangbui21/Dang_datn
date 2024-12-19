import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { 
  NbCardModule, 
  NbInputModule, 
  NbButtonModule, 
  NbCheckboxModule,
  NbLayoutModule
} from '@nebular/theme';

import { AccRoutingModule } from './acc-routing.module';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AccComponent } from './acc.component';

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    ChangePasswordComponent,
    AccComponent
  ],
  imports: [
    CommonModule,
    AccRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    NbCardModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NbLayoutModule
  ]
})
export class AccModule { }
