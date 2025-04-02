import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyPageComponent } from './custom-mypage/custom-mypage.component';
import { StockInfoComponent } from './stock-info/stock-info.component';
import { AuthGuard } from '../acc/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: MyPageComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'stock',
        component: StockInfoComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'stock/:symbol',
        component: StockInfoComponent,
        canActivate: [AuthGuard],
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyPageRoutingModule { } 