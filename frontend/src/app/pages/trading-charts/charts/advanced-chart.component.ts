import { Component } from '@angular/core';
import { TradingViewBaseComponent } from '../trading-base.component';

@Component({
  selector: 'ngx-tr-advanced-chart',
  template: `
    <div class="tradingview-widget-container"></div>
  `,
  
})
export class AdvancedChartComponent extends TradingViewBaseComponent {
  protected loadScript(theme: string , language: string ): void {
    if (this.scriptLoaded) return;

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
        "autosize" : true,
        "symbol": "NASDAQ:AAPL",
        "interval": "D",
        "timezone": "Asia/Ho_Chi_Minh",
        "theme": (theme === 'dark' || theme === 'cosmic') ? 'dark' : 'light',// xử lý chủ đề của char phù hợp với chủ đề chính
        "style": "1",
        "locale": language,
        "enable_publishing": false,
        
        "withdateranges": true,
        "allow_symbol_change": true,
        "watchlist": [
          "BINANCE:BTCUSDT",
          "BITSTAMP:BTCUSD",
          "NASDAQ:AAPL"
        ],//danh sách theo dõi
        "details": true,//hiện các thông tin khác của mã hiện tại
        "hotlist": true,//hiện danh sách hot
        "calendar": false,
        "studies": [
          "STD;Divergence%1Indicator"
        ],//danh sách biểu đồ chỉ báo mặc định hiện
        "container_id": "tradingview_chart"//Id biểu đồ 
    });

    this.elRef.nativeElement.querySelector('.tradingview-widget-container').appendChild(script);
    this.scriptLoaded = true;
  }
}
