import { Component, OnInit } from '@angular/core';
import { GridsterConfig } from 'angular-gridster2';
import { CustomChartService } from '../../custom-charts/custom-chart.service';
import { DashboardItem } from '../../custom-charts/custom-chart/custom-chart.component';
import { AuthService } from '../../../@core/services/auth.service';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-my-page',
  templateUrl: './my-page.component.html',
  styleUrls: ['./my-page.component.scss']
})
export class MyPageComponent implements OnInit {
  // Cấu hình cho gridster
  options: GridsterConfig;
  
  // Mảng chứa các item trong dashboard
  dashboard: Array<DashboardItem> = [];
  userId: number;

  constructor(
    private customChartService: CustomChartService,
    private authService: AuthService,
    private toastrService: NbToastrService,
  ) {}

  ngOnInit() {
    console.log('MyPageComponent initialized');
    this.userId = this.authService.getUserId();
    
    if (!this.userId) {
      this.toastrService.warning(
        'Vui lòng đăng nhập để xem dashboard',
        'Cảnh báo'
      );
      return;
    }

    // Khởi tạo cấu hình gridster
    this.initGridsterOptions();
    
    // Load dashboard configuration
    this.loadDashboard();
  }

  private loadDashboard() {
    this.customChartService.loadDashboardConfigFromSQL(this.userId)
      .subscribe({
        next: (dashboard) => {
          console.log('Dashboard Loaded:', dashboard);
          if (Array.isArray(dashboard) && dashboard.length > 0) {
            this.dashboard = dashboard.map(item => ({
              ...item,
              dragEnabled: true,
              resizeEnabled: true
            }));
          } else {
            this.dashboard = [];
            this.toastrService.info('Không có cấu hình dashboard nào được tìm thấy');
          }
        },
        error: (error) => {
          console.error('Error loading dashboard:', error);
          this.dashboard = [];
          this.toastrService.danger(
            'Không thể tải cấu hình dashboard',
            'Lỗi'
          );
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