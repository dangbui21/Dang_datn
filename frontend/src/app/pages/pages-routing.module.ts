import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';


import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { TechnicalChartsComponent } from './technical-charts/technical-charts.component';
import { StockMarketComponent } from './stock-market/stock-market.component';
import { CustomChartComponent } from './custom-charts/custom-chart/custom-chart.component';
import { MyPageComponent } from './my-page/custom-mypage/custom-mypage.component';

import { AuthGuard } from './acc/guards/auth.guard';
import { ChartGuideComponent } from './chart-guide/chart-guide.component';
import { DashboardHistoryComponent } from './custom-charts/dashboard-history/dashboard-history.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [

    {
      path: '',
      redirectTo: 'stock-market',
      pathMatch: 'full', // Thêm route mặc định trỏ đến stock-market
    },
    
    {
      path: 'stock-market',
      component: StockMarketComponent,
    },
    {
      path: 'technical-charts',
      component: TechnicalChartsComponent,
    },
    {
      path: 'custom-charts',
      children: [
        {
          path: '',
          component: CustomChartComponent,
          canActivate: [AuthGuard],
        },
        {
          path: 'history',
          component: DashboardHistoryComponent,
          canActivate: [AuthGuard],
        }
      ]
    },
    {
      path: 'my-page',
      loadChildren: () => import('./my-page/my-page.module')
        .then(m => m.MyPageModule),
    },
    {
      path: 'chart-guide',
      component: ChartGuideComponent,
    },
    {
      path: 'acc',
      loadChildren: () => import('./acc/acc.module').then(m => m.AccModule),
    },
    {
      path: 'user-management',
      loadChildren: () => import('./user-management/user-management.module')
        .then(m => m.UserManagementModule),
    },
  
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

console.log('Pages routes:', routes);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
