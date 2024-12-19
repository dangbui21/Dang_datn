import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbCardModule, NbMenuModule, NbToastrModule, NbIconModule } from '@nebular/theme';


import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { TechnicalChartsComponent } from './technical-charts/technical-charts.component';
import { StockMarketComponent } from './stock-market/stock-market.component';
import { TradingChartsModule } from './trading-charts/trading-charts.module';
import { CustomChartsModule } from './custom-charts/custom-charts.module';
import { MyPageModule } from './my-page/my-page.module';
import { AccModule } from './acc/acc.module';
import { ChartGuideComponent } from './chart-guide/chart-guide.component';


@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    NbCardModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
    CommonModule,
    TradingChartsModule,
    CustomChartsModule,
    MyPageModule,
    AccModule,
    NbToastrModule.forRoot(),
    NbIconModule,

  ],
  declarations: [
    PagesComponent,
    TechnicalChartsComponent,
    StockMarketComponent,
    ChartGuideComponent,
   
    

  ],
})
export class PagesModule {
}
