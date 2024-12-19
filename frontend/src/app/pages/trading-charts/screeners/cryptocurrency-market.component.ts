import { Component } from '@angular/core';
import { TradingViewBaseComponent } from '../trading-base.component';

@Component({
  selector: 'tr-cryptocurrency-market',
  template: `
    <div class="tradingview-widget-container"></div>
  `,
  
})
export class CryptocurrencyMarketComponent extends TradingViewBaseComponent {
  protected loadScript(theme: string , language: string): void {
    if (this.scriptLoaded) return;

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-screener.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
        "width": "100%",
        "height": "100%",
        "defaultColumn": "overview",
        "screener_type": "crypto_mkt",
        "displayCurrency": "USD",
        "colorTheme": (theme === 'dark' || theme === 'cosmic') ? 'dark' : 'light',
        "locale": language,
    
    });

    this.elRef.nativeElement.querySelector('.tradingview-widget-container').appendChild(script);
    this.scriptLoaded = true;
  }
}
