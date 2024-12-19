import { Component, OnInit } from '@angular/core';
import { GridsterConfig } from 'angular-gridster2';
import { CustomChartService } from '../custom-charts/custom-chart.service';
import { DashboardItem } from '../custom-charts/custom-chart/custom-chart.component';

@Component({
  selector: 'ngx-my-page',
  templateUrl: './my-page.component.html',
  styleUrls: ['./my-page.component.scss']
})
export class MyPageComponent implements OnInit {
  // Cấu hình cho gridster
  options: GridsterConfig;
  
  // Mảng chứa các item trong dashboard
  dashboard: Array<DashboardItem>;

  constructor(private customChartService: CustomChartService) {}

  ngOnInit() {
    console.log('MyPageComponent initialized');
    // Khởi tạo cấu hình gridster
    this.initGridsterOptions();
    
    this.customChartService.loadDashboardConfig()
      .subscribe({
        next: (dashboard) => {
          console.log('Dashboard Loaded:', dashboard);  // Log để kiểm tra dữ liệu
          if (dashboard && dashboard.length > 0) {
            this.dashboard = dashboard;
          } else {
            this.dashboard = [];
          }
        },
        error: (error) => {
          console.error('Error loading dashboard:', error);
          this.dashboard = [];
        }
      });
  }

  /**
   * Khởi tạo các tùy chọn cho gridster
   */
  private initGridsterOptions() {
    this.options = {
      gridType: 'scrollVertical',
      displayGrid: 'always',
      pushItems: true,
      draggable: {
        enabled: true,
        ignoreContent: false,
        dragHandleClass: 'drag-handler',
      },
      resizable: {
        enabled: true,
      },
      minCols: 8,
      maxCols: 8,
      minRows: 1,
      maxRows: 100,
      maxItemCols: 8,
      minItemCols: 1,
      maxItemRows: 100,
      minItemRows: 1,
      defaultItemCols: 4,
      defaultItemRows: 4
    };
  }

  /**
   * Chuyển đổi trạng thái khóa của một item
   */
  toggleLock(item: DashboardItem) {
    item.locked = !item.locked;
    this.dashboard = [...this.dashboard];
  }
} 