import { Component } from '@angular/core';
import { TradingViewBaseComponent } from '../trading-base.component';

@Component({
  selector: 'tr-ticker-tape',
  template: `
    <div class="tradingview-widget-container"></div>
  `,
  
})
export class TickerTapeComponent extends TradingViewBaseComponent {
  protected loadScript(theme: string , language: string): void {
    if (this.scriptLoaded) return;

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
        "symbols": [
            {
              "proName": "FOREXCOM:SPXUSD",
              "title": "S&P 500 Index"
            },
            {
              "proName": "FOREXCOM:NSXUSD",
              "title": "US 100 Cash CFD"
            },
            {
              "proName": "FX_IDC:EURUSD",
              "title": "EUR to USD"
            },
            {
              "proName": "BITSTAMP:BTCUSD",
              "title": "Bitcoin"
            },
            {
              "proName": "BITSTAMP:ETHUSD",
              "title": "Ethereum"
            }
          ],
          "showSymbolLogo": true,
          "isTransparent": false,
          "displayMode": "compact",
          "colorTheme": (theme === 'dark' || theme === 'cosmic') ? 'dark' : 'light',
          "locale": language
    
    });

    this.elRef.nativeElement.querySelector('.tradingview-widget-container').appendChild(script);
    this.scriptLoaded = true;
  }
}
