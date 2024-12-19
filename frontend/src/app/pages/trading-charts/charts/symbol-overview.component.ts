import { Component} from '@angular/core';

import { TradingViewBaseComponent } from '../trading-base.component';

@Component({
  selector: 'tr-symbol-overview',
  template: `
    <div class="tradingview-widget-container"></div>
     
  `,
  
})
export class SymbolOverviewComponent extends TradingViewBaseComponent {
  

  protected loadScript(theme: string, language: string): void {

    // Kiểm tra nếu script đã được tải thì không cần thêm lại
    if (this.scriptLoaded) return;

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      "symbols": [
        [
          "Apple",
          "AAPL|1D"
        ],
        [
          "Google",
          "GOOGL|1D"
        ]
      ],
      "chartOnly": false,
      "width": "100%",
      "height": "100%",
      "locale": language,
      "colorTheme": (theme === 'dark' || theme === 'cosmic') ? 'dark' : 'light',// xử lý chủ đề của char phù hợp với chủ đề chính
      "autosize": true,
      "showVolume": false,
      "showMA": false,
      "hideDateRanges": false,
      "hideMarketStatus": false,
      "hideSymbolLogo": false,
      "scalePosition": "right",
      "scaleMode": "Normal",
      "fontFamily": "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
      "fontSize": "10",
      "noTimeScale": false,
      "valuesTracking": "1",
      "changeMode": "price-and-percent",
      "chartType": "area",
      "maLineColor": "#2962FF",
      "maLineWidth": 1,
      "maLength": 9,
      "headerFontSize": "medium",
      "lineWidth": 2,
      "lineType": 0,
      "dateRanges": [
        "1d|1",
        "1m|30",
        "3m|60",
        "12m|1D",
        "60m|1W",
        "all|1M"
      ]
    
    });
    this.elRef.nativeElement.querySelector('.tradingview-widget-container').appendChild(script);
    this.scriptLoaded = true; // Đánh dấu là đã tải script
  }

}
