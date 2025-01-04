import { Component, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { UserManagementService } from './user-management.service';
import { AuthService } from '../../@core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  users: any[] = [];
  searchTerm: string = '';
  loading: boolean = false;

  constructor(
    private userManagementService: UserManagementService,
    private toastrService: NbToastrService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/pages/acc/login']);
      return;
    }
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;
    this.userManagementService.getAllUsers().subscribe({
      next: (response) => {
        if (response.success) {
          this.users = response.data;
        } else {
          this.toastrService.warning('Không thể tải danh sách người dùng', 'Cảnh báo');
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error:', error);
        if (error.status === 401) {
          this.toastrService.danger('Phiên đăng nhập hết hạn', 'Lỗi');
          this.router.navigate(['/pages/acc/login']);
        } else {
          this.toastrService.danger(
            error.error?.message || 'Có lỗi xảy ra khi tải danh sách người dùng',
            'Lỗi'
          );
        }
        this.loading = false;
      }
    });
  }

  onSearch() {
    if (this.searchTerm.trim()) {
      this.loading = true;
      this.userManagementService.searchUsers(this.searchTerm).subscribe({
        next: (response) => {
          this.users = response.data;
          this.loading = false;
        },
        error: (error) => {
          this.toastrService.danger(
            error.message || 'Có lỗi xảy ra',
            'Lỗi'
          );
          this.loading = false;
        }
      });
    } else {
      this.loadUsers();
    }
  }

  updateUserStatus(userId: number, newStatus: string) {
    let confirmMessage = '';
    
    switch (newStatus) {
      case 'inactive':
        confirmMessage = 'Tạm khóa tài khoản này? Người dùng sẽ không thể đăng nhập cho đến khi được kích hoạt lại.';
        break;
      case 'banned':
        confirmMessage = 'Cấm tài khoản này? Đây là hành động nghiêm trọng và thường áp dụng cho các vi phạm điều khoản.';
        break;
      case 'active':
        confirmMessage = 'Kích hoạt lại tài khoản này?';
        break;
    }

    if (confirm(confirmMessage)) {
      this.userManagementService.updateUserStatus(userId, newStatus).subscribe({
        next: (response) => {
          let successMessage = '';
          switch (newStatus) {
            case 'inactive':
              successMessage = 'Đã tạm khóa tài khoản';
              break;
            case 'banned':
              successMessage = 'Đã cấm tài khoản';
              break;
            case 'active':
              successMessage = 'Đã kích hoạt tài khoản';
              break;
          }
          this.toastrService.success(successMessage, 'Thành công');
          this.loadUsers();
        },
        error: (error) => {
          this.toastrService.danger(
            error.message || 'Có lỗi xảy ra khi cập nhật trạng thái',
            'Lỗi'
          );
        }
      });
    }
  }
} 