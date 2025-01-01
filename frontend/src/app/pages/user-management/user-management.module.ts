import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { 
  NbCardModule, 
  NbIconModule, 
  NbInputModule, 
  NbButtonModule,
  NbSelectModule,
  NbSearchModule,
  NbTableModule,
  NbToggleModule,
  NbDialogModule,
  NbTreeGridModule,
} from '@nebular/theme';

import { UserManagementRoutingModule } from './user-management-routing.module';
import { UserManagementComponent } from './user-management.component';
import { ThemeModule } from '../../@theme/theme.module';

@NgModule({
  declarations: [
    UserManagementComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ThemeModule,
    NbCardModule,
    NbIconModule,
    NbInputModule,
    NbButtonModule,
    NbSelectModule,
    NbSearchModule,
    NbTableModule,
    NbToggleModule,
    NbDialogModule.forChild(),
    NbTreeGridModule,
    UserManagementRoutingModule,
  ]
})
export class UserManagementModule { } 