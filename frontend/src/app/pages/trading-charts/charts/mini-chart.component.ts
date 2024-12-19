import { Component } from '@angular/core';
import { TradingViewBaseComponent } from '../trading-base.component';

@Component({
  selector: 'tr-mini-chart',
  template: `
    <div class="tradingview-widget-container"></div>
  `,
 
})
export class MiniChartComponent extends TradingViewBaseComponent {
  protected loadScript(theme: string , language : string): void {
    if (this.scriptLoaded) return;

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
        "symbol": "FX:EURUSD",
        "width": "100%",
        "height": "100%",
        "locale": language,
        "dateRange": "12M",
        "colorTheme": (theme === 'dark' || theme === 'cosmic') ? 'dark' : 'light',// xử lý chủ đề của char phù hợp với chủ đề chính
        "isTransparent": false,
        "autosize": true,
        "largeChartUrl": ""
    });

    this.elRef.nativeElement.querySelector('.tradingview-widget-container').appendChild(script);
    this.scriptLoaded = true;
  }
}
