import { Component } from '@angular/core';
import { TradingViewBaseComponent } from '../trading-base.component';

@Component({
  selector: 'tr-hotlist',
  template: `
    <div class="form-group">
    <label for="exchangeSelect" class="text-label">Chọn sàn giao dịch:</label>
    <nb-select id="exchangeSelect" [(selected)]="selectedExchange" (selectedChange)="updateExchange()" fullWidth>
      <nb-option value="HNX">Vietnam (HNX)</nb-option>
      <nb-option value="HAM">Germany (HAM)</nb-option>
      <nb-option value="SSE">China (SSE)</nb-option>
      <nb-option value="NYSE">USA (NYSE)</nb-option>
      <nb-option value="RUS">Russia (RUS)</nb-option>
    </nb-select>
    </div>
    <div class="tradingview-widget-container"></div>
  `,

})
export class HotlistsComponent extends TradingViewBaseComponent {
    selectedExchange: string = 'HNX'; // Giá trị mặc định

    protected loadScript(theme: string , language: string): void {
        if (this.scriptLoaded) return;

        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-hotlists.js';
        script.async = true;
        script.innerHTML = JSON.stringify({
            "colorTheme": (theme === 'dark' || theme === 'cosmic') ? 'dark' : 'light',// xử lý chủ đề của char phù hợp với chủ đề chính
            "dateRange": "12M",
            "exchange": this.selectedExchange,
            "showChart": true,
            "locale": language,
            "largeChartUrl": "",
            "isTransparent": false,
            "showSymbolLogo": false,
            "showFloatingTooltip": false,
            "width": "400",
            "height": "550",
            "plotLineColorGrowing": "rgba(41, 98, 255, 1)",
            "plotLineColorFalling": "rgba(41, 98, 255, 1)",
            "gridLineColor": "rgba(240, 243, 250, 0)",
            "scaleFontColor": "rgba(209, 212, 220, 1)",
            "belowLineFillColorGrowing": "rgba(41, 98, 255, 0.12)",
            "belowLineFillColorFalling": "rgba(41, 98, 255, 0.12)",
            "belowLineFillColorGrowingBottom": "rgba(41, 98, 255, 0)",
            "belowLineFillColorFallingBottom": "rgba(41, 98, 255, 0)",
            "symbolActiveColor": "rgba(41, 98, 255, 0.12)"
    });

    this.elRef.nativeElement.querySelector('.tradingview-widget-container').appendChild(script);
    this.scriptLoaded = true;
  }

   // Hàm này sẽ được gọi khi người dùng thay đổi lựa chọn sàn giao dịch
   updateExchange(): void {
    // Xóa biểu đồ cũ và đặt lại cờ scriptLoaded
    const container = this.elRef.nativeElement.querySelector('.tradingview-widget-container');
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    this.scriptLoaded = false;

    // Tải lại biểu đồ với sàn giao dịch mới
    this.loadScript(this.currentTheme , this.currentLanguage);
  }

}
