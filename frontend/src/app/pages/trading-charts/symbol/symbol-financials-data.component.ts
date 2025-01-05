import { Component, OnInit } from '@angular/core';
import { SymbolBaseComponent } from './symbol-base.component';

@Component({
  selector: 'tr-symbol-financials-data',
  template: ` <div class="tradingview-widget-container"></div>
    <!-- <div class="symbol-selector">
      <label for="symbol">Select Symbol:</label>
      <select id="symbol" [(ngModel)]="selectedSymbol" (change)="onSymbolChange($event)">
        
        <option *ngFor="let sym of getSymbols()" [value]="sym">{{ sym }}</option>
      </select>
    </div>
    <div class="tradingview-widget-container"></div> -->
  `,
  styles: [
    `
      .symbol-selector {
        margin-bottom: 10px;
      }
    `,
  ],
})
export class SymbolFinancialsDataComponent extends SymbolBaseComponent implements OnInit {
  
  ngOnInit(): void {
    super.ngOnInit(); // Gọi ngOnInit của lớp cha
    if (this.getSymbols().length > 0) {
      this.selectedSymbol = this.getSymbols()[0]; // Gán mã đầu tiên làm mặc định
      this.loadScript(this.currentTheme, this.currentLanguage, this.selectedSymbol); // Tải script cho mã đầu tiên
    }
  }

  protected loadScript(theme: string, language: string, symbol: string): void {
    if (this.scriptLoaded) return;

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-financials.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      isTransparent: false,
      largeChartUrl: '',
      displayMode: 'regular',
      width: '100%',
      height: '100%',
      colorTheme: theme === 'dark' || theme === 'cosmic' ? 'dark' : 'light',
      symbol: symbol ,
      locale: language,
    });

    this.elRef.nativeElement.querySelector('.tradingview-widget-container').appendChild(script);
    this.scriptLoaded = true;
  }

  onSymbolChange(event: Event): void {
    this.selectedSymbol = (event.target as HTMLSelectElement).value; // Lấy giá trị mã đã chọn
    this.resetContainer(); // Clear the existing widget
    this.scriptLoaded = false; // Reset the flag
    this.loadScript(this.currentTheme, this.currentLanguage, this.selectedSymbol); // Load new script
  }
  
}
