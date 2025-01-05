import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbCardModule } from '@nebular/theme';
import { StockInfoComponent } from './stock-info.component';
import { StockInfoRoutingModule } from './stock-info-routing.module';
import { TradingChartsModule } from '../trading-charts/trading-charts.module';
@NgModule({
  declarations: [
    StockInfoComponent
  ],
  imports: [
    CommonModule,
    NbCardModule,
    StockInfoRoutingModule,
    TradingChartsModule
  ]
})
export class StockInfoModule { } 