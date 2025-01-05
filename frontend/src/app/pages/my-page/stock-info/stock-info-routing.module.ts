import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StockInfoComponent } from './stock-info.component';

const routes: Routes = [
  { path: ':symbol', component: StockInfoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StockInfoRoutingModule { } 