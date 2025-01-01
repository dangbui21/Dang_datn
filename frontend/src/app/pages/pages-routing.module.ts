import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { TechnicalChartsComponent } from './technical-charts/technical-charts.component';
import { StockMarketComponent } from './stock-market/stock-market.component';
import { CustomChartComponent } from './custom-charts/custom-chart/custom-chart.component';
import { MyPageComponent } from './my-page/my-page.component';
import { AccComponent } from './acc/acc.component';
import { AuthGuard } from './acc/guards/auth.guard';
import { ChartGuideComponent } from './chart-guide/chart-guide.component';
import { DashboardHistoryComponent } from './custom-charts/dashboard-history/dashboard-history.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
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
      component: MyPageComponent,  
      canActivate: [AuthGuard]
    },
    {
      path: 'chart-guide',
      component: ChartGuideComponent,
    },
    {
      path: 'acc',
      component: AccComponent,
      loadChildren: () => import('./acc/acc-routing.module').then(m => m.AccRoutingModule),
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

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
