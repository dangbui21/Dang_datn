import { Component, OnInit } from '@angular/core';
import { TradingViewBaseComponent } from '../trading-base.component';
import { SymbolBaseComponent } from './symbol-base.component';

@Component({
  selector: 'ngx-tr-symbol-profile',
  template: `
    <div class="tradingview-widget-container"></div>
  `,
  
})
export class SymbolProfileComponent extends SymbolBaseComponent implements OnInit {
  
    
  ngOnInit(): void {
    super.ngOnInit(); // Gọi ngOnInit của lớp cha
    if (this.getSymbols().length > 0) {
      this.selectedSymbol = this.getSymbols()[0]; // Gán mã đầu tiên làm mặc định
      this.loadScript(this.currentTheme, this.currentLanguage, this.selectedSymbol); // Tải script cho mã đầu tiên
    }
  }

  protected loadScript(theme: string, language: string, symbol: string): void {
    if (this.scriptLoaded) return;

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-symbol-profile.js';
      script.async = true;
      script.innerHTML = JSON.stringify({     
        "width": "100%",
        "isTransparent": false,
        "height": "100%",
        "symbol": symbol,     
        "locale": language,
        "colorTheme": (theme === 'dark' || theme === 'cosmic') ? 'dark' : 'light',
    });

    this.elRef.nativeElement.querySelector('.tradingview-widget-container').appendChild(script);
    this.scriptLoaded = true;
  }

  onSymbolChange(event: Event): void {
    this.selectedSymbol = (event.target as HTMLSelectElement).value; // Lấy giá trị mã đã chọn
    this.resetContainer(); // Clear the existing widget
    this.scriptLoaded = false; // Reset the flag
    this.loadScript(this.currentTheme, this.currentLanguage, this.selectedSymbol); // Load new script
  }
}
