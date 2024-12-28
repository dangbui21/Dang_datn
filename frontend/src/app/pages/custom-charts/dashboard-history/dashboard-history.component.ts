import { Component, OnInit } from '@angular/core';
import { DashboardHistoryService } from '../../../@core/services/dashboard-history.service';
import { AuthService } from '../../../@core/services/auth.service';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';


@Component({
  selector: 'ngx-dashboard-history',
  templateUrl: './dashboard-history.component.html',
  styleUrls: ['./dashboard-history.component.scss']
})
export class DashboardHistoryComponent implements OnInit {
  historyList: any[] = [];
  selectedHistory: any = null;
  userId: number;

  constructor(
    private historyService: DashboardHistoryService,
    private authService: AuthService,
    private router: Router,
    private toastrService: NbToastrService,
    private dashboardHistoryService: DashboardHistoryService
  ) { }

  ngOnInit() {
    this.userId = this.authService.getUserId();
    if (this.userId) {
      this.loadHistoryList();
    }
  }

  loadHistoryList() {
    this.historyService.getHistoryList(this.userId).subscribe({
      next: (data) => {
        this.historyList = data;
      },
      error: (error) => {
        this.toastrService.danger('Không thể tải danh sách lịch sử', 'Lỗi');
      }
    });
  }

  viewHistoryDetail(historyId: number) {
    this.historyService.getHistoryDetail(historyId).subscribe({
      next: (data) => {
        this.dashboardHistoryService.updateDashboard(data);
        this.router.navigate(['/pages/custom-charts']);
      },
      error: (error) => {
        this.toastrService.danger('Lỗi không thể xem chi tiết', 'Lỗi');
      }
    });
  }

  applyHistory(historyId: number) {
    this.historyService.applyHistoryConfig(historyId, this.userId).subscribe({
      next: () => {
        this.toastrService.success('Áp dụng cấu hình thành công', 'Thành công');
        this.router.navigate(['/pages/custom-charts']);
      },
      error: (error) => {
        this.toastrService.danger('Lỗi không thể áp dụng cấu hình', 'Lỗi');
      }
    });
  }

  deleteHistory(historyId: number) {
    if (confirm('Bạn có chắc chắn muốn xóa lịch sử này không?')) {
      this.dashboardHistoryService.deleteHistory(historyId).subscribe({
        next: () => {
          this.toastrService.success('Đã xóa lịch sử thành công', 'Thành công');
          this.loadHistoryList(); // Tải lại danh sách sau khi xóa
        },
        error: (error) => {
          this.toastrService.danger('Không thể xóa lịch sử', 'Lỗi');
        }
      });
    }
  }
} 