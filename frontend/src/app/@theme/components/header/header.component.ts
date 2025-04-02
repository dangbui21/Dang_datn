import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService, NbToastrService, NbSearchService } from '@nebular/theme';
import { Router } from '@angular/router';

import { UserData } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { LanguageService } from '../../../@core/services/language.service';
import { AuthService } from '../../../@core/services/auth.service';
import { StockSearchService } from '../../../@core/services/stock-search.service';


@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;
  currentLanguage: string = 'en'; 

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    
  ];

  currentTheme = 'default';

  userMenu = [
    { title: 'Profile' },
    { title: 'Log out', action: () => { console.log('Log out clicked'); this.logout(); } }
  ];

  constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private userService: UserData,
    private layoutService: LayoutService,
    private breakpointService: NbMediaBreakpointsService,
    private languageService: LanguageService,
    private router: Router,
    private authService: AuthService,
    private stockSearchService: StockSearchService,
    private toastrService: NbToastrService,
    private searchService: NbSearchService
  ) {
    console.log('HeaderComponent initialized');
    console.log('User menu:', this.userMenu);
    // Đăng ký subscription để theo dõi ngôn ngữ hiện tại
    this.languageService.currentLanguage$.subscribe(language => {
      this.currentLanguage = language;

      this.loadContentForCurrentLanguage();
    });

    // Subscribe to search events
    this.searchService.onSearchSubmit()
      .subscribe((data: any) => {
        console.log('Search submitted:', data);
        this.onSearch(data.term);
      });
  }
  

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;

    this.userService.getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((users: any) => this.user = users.nick);

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  changeLanguage(language: string): void {
    this.languageService.changeLanguage(language);
    console.log(`Ngôn ngữ hiện tại sau khi chuyển đổi: ${this.languageService.getCurrentLanguage()}`);
    this.loadContentForCurrentLanguage();
  }

  private loadContentForCurrentLanguage(): void {
    // Logic để load lại nội dung dựa trên ngôn ngữ hiện tại
    // Ví dụ: gọi lại các hàm để cập nhật nội dung, hoặc load lại các component cần thiết
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
  
  toggleLanguage(): void {
    const newLanguage = this.currentLanguage === 'en' ? 'vi_VN' : 'en';
    this.changeLanguage(newLanguage);
  }

  logout() {
    // localStorage.removeItem('user'); // Xóa thông tin người dùng
    // console.log('Đăng xuất thành công'); // In ra log khi đăng xuất thành công
    
    // // Cập nhật lại menu
    // this.menuService.navigateHome();
    // // Đợi một chút để đảm bảo menu được cập nhật
    // setTimeout(() => {
    //   window.location.reload(); // Tải lại trang để cập nhật menu
    // }, 100);
    this.authService.logout(); // Sử dụng service để đăng xuất
    console.log('Đăng xuất thành công');
    this.router.navigate(['/pages/acc/login']); // Chuyển hướng về trang đăng nhập
  }

  onSearch(searchTerm: string) {
    console.log('Search triggered with term:', searchTerm);
    
    this.stockSearchService.searchStocks(searchTerm).subscribe({
      next: (result) => {
        console.log('Search result:', result);
        if (result && result.length > 0) {
          const foundSymbol = result[0].symbol;
          console.log('Stock found, navigating to:', foundSymbol);
          this.router.navigate(['/pages/my-page/stock', foundSymbol]);
        } else {
          console.log('No stock found for term:', searchTerm);
          this.toastrService.show('Không tìm thấy mã cổ phiếu', 'Thông báo', { status: 'warning' });
        }
      },
      error: (error) => {
        console.error('Search API error:', error);
        this.toastrService.show('Có lỗi xảy ra khi tìm kiếm', 'Lỗi', { status: 'danger' });
      }
    });
  }

}
