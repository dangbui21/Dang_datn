import { Component } from '@angular/core';
import { TradingViewBaseComponent } from '../trading-base.component';

@Component({
  selector: 'tr-forex-heatmap',
  template: `
    <div class="tradingview-widget-container"></div>
  `,
  
})
export class ForrexHeatmapComponent extends TradingViewBaseComponent {
  protected loadScript(theme: string, language: string): void {
    if (this.scriptLoaded) return;

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-forex-heat-map.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
       "width": "100%",
        "height": "100%",
        "currencies": [
            "EUR",
            "USD",
            "JPY",
            "GBP",
            "CHF",
            "AUD",
            "CAD",
            "NZD",
            "CNY"
        ],
        "isTransparent": false,
        "colorTheme": (theme === 'dark' || theme === 'cosmic') ? 'dark' : 'light',
        "locale": language,
        "backgroundColor": (theme === 'dark' || theme === 'cosmic') ? "#000000" : "#ffffff" ,
    });

    this.elRef.nativeElement.querySelector('.tradingview-widget-container').appendChild(script);
    this.scriptLoaded = true;
  }
}
