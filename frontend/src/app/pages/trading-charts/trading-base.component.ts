import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { LanguageService } from '../../@core/services/language.service';

@Component({
  template: '' 
})
export abstract class TradingViewBaseComponent implements OnInit, AfterViewInit, OnDestroy {
  currentTheme: string; //chủ đề 
  currentLanguage: string; //ngôn ngữ
  
  protected scriptLoaded = false;

  @Input() symbol!: string; // Mã chứng khoán

  constructor(protected elRef: ElementRef, protected themeService: NbThemeService, protected languageService: LanguageService) {}

  ngOnInit(): void {
    this.currentTheme = this.themeService.currentTheme; // Lấy chủ đề hiện tại
    this.currentLanguage = this.languageService.getCurrentLanguage(); // Lấy ngôn ngữ hiện tại
    this.loadScript(this.currentTheme, this.currentLanguage , this.symbol); 

    // Theo dõi sự thay đổi chủ đề
    this.themeService.onThemeChange().subscribe(theme => {
      this.currentTheme = theme.name;
      this.resetContainer();
      this.scriptLoaded = false; // Đặt lại cờ để load script mới
      this.loadScript(this.currentTheme, this.currentLanguage, this.symbol); 
    });

    // Theo dõi sự thay đổi ngôn ngữ
    this.languageService.currentLanguage$.subscribe(language => {
      this.currentLanguage = language;
      this.resetContainer(); // Reset container trước khi load lại script
      this.scriptLoaded = false; // Đặt lại cờ để load script mới
      this.loadScript(this.currentTheme, this.currentLanguage , this.symbol); // Gọi loadScript với ngôn ngữ mới
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.loadScript(this.currentTheme, this.currentLanguage , this.symbol), 0);
  }

  ngOnDestroy(): void {
    this.resetContainer();
  }

  protected resetContainer(): void {
    const container = this.elRef.nativeElement.querySelector('.tradingview-widget-container');
    while (container && container.firstChild) {
      container.removeChild(container.firstChild);
    }
  }

  // Hàm loadScript sẽ được các component con triển khai
 
  protected abstract loadScript(theme: string, language: string ,symbol: string): void; 
}