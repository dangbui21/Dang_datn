import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TradingViewBaseComponent } from '../trading-base.component';
import { NbThemeService } from '@nebular/theme';
import { LanguageService } from '../../../@core/services/language.service';

@Component({
  selector: 'ngx-symbol-base',
  template: ` `,
})
export class SymbolBaseComponent extends TradingViewBaseComponent implements OnInit {
  protected symbols: string[] = [];
  selectedSymbol: string = "NASDAQ:AAPL";

  constructor(
    protected elRef: ElementRef,
    protected themeService: NbThemeService,
    protected languageService: LanguageService,
    private http: HttpClient
  ) {
    super(elRef, themeService, languageService);
  }

  ngOnInit(): void {
    super.ngOnInit(); 
    this.loadSymbols(); // Tải danh sách mã khi khởi tạo
  }

  private loadSymbols(): void {
    this.http.get<{ symbols: string[] }>('assets/data/symbols.json').subscribe(data => {
      this.symbols = data.symbols;
      // Nếu cần, có thể gọi loadScript với mã đầu tiên trong danh sách
      if (this.symbols.length > 0) {
        this.symbol = this.symbols[0]; // Gán mã đầu tiên làm mặc định
        this.loadScript(this.currentTheme, this.currentLanguage, this.symbol);
      }
    });
  }

  protected loadScript(theme: string, language: string, symbol: string): void {}
  
  getSymbols(): string[] {
    return this.symbols;
  }
}
