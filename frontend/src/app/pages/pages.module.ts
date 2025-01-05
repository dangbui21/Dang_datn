import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbCardModule, NbMenuModule, NbIconModule } from '@nebular/theme';


import { ThemeModule } from '../@theme/theme.module';


import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { StockMarketComponent } from './stock-market/stock-market.component';
import { TradingChartsModule } from './trading-charts/trading-charts.module';
import { CustomChartsModule } from './custom-charts/custom-charts.module';
import { MyPageModule } from './my-page/my-page.module';
import { AccModule } from './acc/acc.module';
import { UserManagementModule } from './user-management/user-management.module';

import { ChartGuideComponent } from './chart-guide/chart-guide.component';
import { PagesComponent } from './pages.component';
import { TechnicalChartsComponent } from './technical-charts/technical-charts.component';
import { AuthGuard } from './acc/guards/auth.guard';



@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    CommonModule,
    
    NbMenuModule,
    NbCardModule,
    NbIconModule,
   
    TradingChartsModule,
    CustomChartsModule,
    MyPageModule,
    AccModule,
    UserManagementModule,
    MiscellaneousModule,
    
  ],
  declarations: [
    PagesComponent,
    TechnicalChartsComponent,
    StockMarketComponent,
    ChartGuideComponent,
  ],
  providers: [
    AuthGuard
  ],
})
export class PagesModule {
}
