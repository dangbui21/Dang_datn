import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyPageComponent } from './my-page.component';
import { NbCardModule, NbButtonModule, NbIconModule, NbSelectModule } from '@nebular/theme';
import { GridsterModule } from 'angular-gridster2';
import { TradingChartsModule } from '../trading-charts/trading-charts.module';

@NgModule({
  declarations: [MyPageComponent],
  imports: [
    CommonModule,
    NbCardModule,
    NbButtonModule,
    NbIconModule,
    GridsterModule,
    TradingChartsModule,
    NbSelectModule,
  ]
})
export class MyPageModule { } 