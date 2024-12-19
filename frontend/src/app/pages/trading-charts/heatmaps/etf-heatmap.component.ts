import { Component } from '@angular/core';
import { TradingViewBaseComponent } from '../trading-base.component';

@Component({
  selector: 'tr-etf-heatmap',
  template: `
    <div class="tradingview-widget-container"></div>
  `,
  
})
export class EtfHeatmapComponent extends TradingViewBaseComponent {
  protected loadScript(theme: string , language: string): void {
    if (this.scriptLoaded) return;

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-etf-heatmap.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
        "dataSource": "AllUSEtf",
        "blockSize": "aum",
        "blockColor": "change",
        "grouping": "asset_class",
        "locale": language,
        "symbolUrl": "",
        "colorTheme": (theme === 'dark' || theme === 'cosmic') ? 'dark' : 'light',
        "hasTopBar": true,
        "isDataSetEnabled": true,
        "isZoomEnabled": true,
        "hasSymbolTooltip": true,
        "isMonoSize": false,
        "width": "100%",
        "height": "100%"
    });

    this.elRef.nativeElement.querySelector('.tradingview-widget-container').appendChild(script);
    this.scriptLoaded = true;
  }
}