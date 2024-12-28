import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardHistoryComponent } from "./dashboard-history/dashboard-history.component";
import { CustomChartComponent } from "./custom-chart/custom-chart.component";

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: CustomChartComponent
            },
            {
                path: 'history',
                component: DashboardHistoryComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CustomChartsRoutingModule { } 