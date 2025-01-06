import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyPageComponent } from './custom-mypage/custom-mypage.component';
import { StockInfoComponent } from './stock-info/stock-info.component';
import { NbCardModule, NbButtonModule, NbIconModule, NbSelectModule } from '@nebular/theme';
import { GridsterModule } from 'angular-gridster2';
import { TradingChartsModule } from '../trading-charts/trading-charts.module';
import { MyPageRoutingModule } from './my-page-routing.module';

@NgModule({
  declarations: [
    MyPageComponent,
    StockInfoComponent
  ],
  imports: [
    CommonModule,
    NbCardModule,
    NbButtonModule,
    NbIconModule,
    GridsterModule,
    TradingChartsModule,
    NbSelectModule,
    MyPageRoutingModule
  ]
})
export class MyPageModule {
  constructor() {
    console.log('MyPageModule loaded');
  }
} 