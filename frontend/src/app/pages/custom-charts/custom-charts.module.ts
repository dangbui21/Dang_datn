import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomChartComponent } from './custom-chart/custom-chart.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { NbCardModule, NbButtonModule, NbIconModule } from '@nebular/theme';
import { TradingChartsModule } from '../trading-charts/trading-charts.module';
import { GridsterModule } from 'angular-gridster2';
import { FormsModule } from '@angular/forms';
import {NbSelectModule} from '@nebular/theme';

@NgModule({
  declarations: [CustomChartComponent],
  imports: [
    CommonModule,
    MatGridListModule,
    NbCardModule,
    NbButtonModule,
    NbIconModule,
    TradingChartsModule,
    GridsterModule,
    FormsModule,
    NbSelectModule,
  ],
  exports: [CustomChartComponent, TradingChartsModule, NbSelectModule],
  
})
export class CustomChartsModule { }
