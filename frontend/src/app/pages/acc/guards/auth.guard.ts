import { Injectable } from '@angular/core';
import { 
  ActivatedRouteSnapshot, 
  CanActivate, 
  RouterStateSnapshot, 
  UrlTree,
  Router 
} from '@angular/router';
import { Observable } from 'rxjs';
import { NbToastrService } from '@nebular/theme';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private toastrService: NbToastrService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Kiểm tra xem người dùng đã đăng nhập chưa
    const user = localStorage.getItem('user');
    
    if (user) {
      return true; // Cho phép truy cập nếu đã đăng nhập
    }

    // Hiển thị thông báo cảnh báo
    this.toastrService.warning(
      'Vui lòng đăng nhập để sử dụng tiện ích này',
      'Yêu cầu đăng nhập', 
      { duration: 3000 } // Thông báo sẽ tự động đóng sau 3 giây
    );

    this.router.navigate(['/pages/acc/login'], { 
      queryParams: { returnUrl: state.url }
    });
    return false;
  }
}
