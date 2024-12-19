import { Component } from '@angular/core';
import { TradingViewBaseComponent } from '../trading-base.component';

@Component({
  selector: 'tr-single-ticker',
  template: `
    <div class="tradingview-widget-container"></div>
  `,
  
})
export class SingleTickerComponent extends TradingViewBaseComponent {
  protected loadScript(theme: string , language: string): void {
    if (this.scriptLoaded) return;

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-single-quote.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
        "symbol": "FX:EURUSD",
        "width": "100%",
        "isTransparent": false,
        "colorTheme": (theme === 'dark' || theme === 'cosmic') ? 'dark' : 'light',
        "locale": language,
    
    });

    this.elRef.nativeElement.querySelector('.tradingview-widget-container').appendChild(script);
    this.scriptLoaded = true;
  }
}
