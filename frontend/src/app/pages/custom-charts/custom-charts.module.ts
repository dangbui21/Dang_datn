import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomChartsRoutingModule } from './custom-charts-routing.module';
import { CustomChartComponent } from './custom-chart/custom-chart.component';
import { DashboardHistoryComponent } from './dashboard-history/dashboard-history.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { NbCardModule, NbButtonModule, NbIconModule, NbListModule, NbTooltipModule } from '@nebular/theme';
import { TradingChartsModule } from '../trading-charts/trading-charts.module';
import { GridsterModule } from 'angular-gridster2';
import { FormsModule } from '@angular/forms';
import {NbSelectModule} from '@nebular/theme';
import { NbToastrModule } from '@nebular/theme';


@NgModule({
  declarations: [
    CustomChartComponent,
    DashboardHistoryComponent,
  ],
  imports: [
    CommonModule,
    CustomChartsRoutingModule,
    
    GridsterModule,

    NbCardModule,
    NbButtonModule,
    NbIconModule,
    NbSelectModule,
    NbListModule,
    NbTooltipModule,
    NbToastrModule.forRoot(),
    
    MatGridListModule,
    FormsModule,
  ],
  exports: [CustomChartComponent, TradingChartsModule, NbSelectModule, DashboardHistoryComponent],
  
})
export class CustomChartsModule { }
