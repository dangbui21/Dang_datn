import { NbMenuItem } from '@nebular/theme';
import { LanguageService } from '../@core/services/language.service';
import { Injectable } from '@angular/core';
import { AuthService } from '../@core/services/auth.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuItems {
  private menuItems = new BehaviorSubject<NbMenuItem[]>([]);
  menuItems$ = this.menuItems.asObservable();

  constructor(
    private languageService: LanguageService,
    private authService: AuthService
  ) {
    // Lắng nghe sự thay đổi đăng nhập
    this.authService.isLoggedIn$.subscribe(() => {
      this.updateMenu();
    });

    // Lắng nghe sự thay đổi ngôn ngữ
    this.languageService.currentLanguage$.subscribe(() => {
      this.updateMenu();
    });

    // Khởi tạo menu lần đầu
    this.updateMenu();
  }

  private updateMenu() {
    const currentLang = this.languageService.getCurrentLanguage();
    const user = localStorage.getItem('user');

    const menuItems = [
      {
        title: currentLang === 'en' ? 'Market' : 'Thị trường',
        icon: 'trending-up-outline',
        link: '/pages/stock-market',
      },
      {
        title: currentLang === 'en' ? 'Technical Charts' : 'Biểu đồ kỹ thuật',
        icon: 'bar-chart-outline',
        link: '/pages/technical-charts',
      },
      {
        title: currentLang === 'en' ? 'Custom Charts' : 'Biểu đồ tùy chỉnh',
        icon: 'settings-outline',
        link: '/pages/custom-charts',
        children: [
          {
            title: currentLang === 'en' ? 'Custom' : 'Tùy chỉnh',
            link: '/pages/custom-charts',
            
          },
          {
            title: currentLang === 'en' ? 'Histoty' : 'Lịch sử',
            link: '/pages/custom-charts/history',
            
          },
        ],
      },
      {
        title: currentLang === 'en' ? 'My Page' : 'Trang của tôi',
        icon: 'person-outline',
        link: '/pages/my-page',
      },
      {
        title: currentLang === 'en' ? 'Chart Guide' : 'Hướng dẫn sử dụng biểu đồ',
        icon: 'question-mark-circle-outline',
        link: '/pages/chart-guide',
      },
      {
        title: currentLang === 'en' ? 'Account' : 'Tài khoản',
        icon: 'person-outline',
        children: [
          {
            title: currentLang === 'en' ? 'Login' : 'Đăng nhập',
            link: '/pages/acc/login',
            hidden: !!user,
          },
          {
            title: currentLang === 'en' ? 'Register' : 'Đăng ký',
            link: '/pages/acc/register',
            hidden: !!user,
          },
          {
            title: currentLang === 'en' ? 'Change Password' : 'Đổi mật khẩu',
            link: '/pages/acc/change-password',
            hidden: !user,
          },
        ],
      },
    ];

    this.menuItems.next(menuItems);
  }
}
