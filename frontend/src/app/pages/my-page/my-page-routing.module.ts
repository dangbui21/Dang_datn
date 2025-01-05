import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyPageComponent } from './custom-mypage/my-page.component';
import { StockInfoComponent } from './stock-info/stock-info.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: MyPageComponent
      },
      {
        path: 'stock',
        component: StockInfoComponent
      },
      {
        path: 'stock/:symbol',
        component: StockInfoComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyPageRoutingModule { } 