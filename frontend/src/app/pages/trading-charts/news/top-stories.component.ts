import { Component } from '@angular/core';
import { TradingViewBaseComponent } from '../trading-base.component';

@Component({
  selector: 'ngx-tr-news',
  template: `
    <div class="tradingview-widget-container"></div>
  `,
  
})
export class NewsComponent extends TradingViewBaseComponent {
  protected loadScript(theme: string , language: string , symbol: string): void {
    if (this.scriptLoaded) return;

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-timeline.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
        "feedMode": "all_symbols",
        "isTransparent": false,
        "displayMode": "regular",
        "width": "100%",
        "height": "100%",
        "colorTheme": (theme === 'dark' || theme === 'cosmic') ? 'dark' : 'light',
        "locale": language,
        "symbols": "NASDAQ:AAPL"
    
    });

    this.elRef.nativeElement.querySelector('.tradingview-widget-container').appendChild(script);
    this.scriptLoaded = true;
  }
}
