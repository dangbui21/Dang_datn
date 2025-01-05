import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  NbCardModule, 
  NbButtonModule, 
  NbSelectModule, 
  NbIconModule 
} from '@nebular/theme';
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
    NbButtonModule,
    NbSelectModule,
    NbIconModule,
    StockInfoRoutingModule,
    TradingChartsModule
  ]
})
export class StockInfoModule { } 