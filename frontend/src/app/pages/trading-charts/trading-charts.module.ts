import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbCardModule, NbMenuModule, NbSelectModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';

import { SymbolOverviewComponent } from './charts/symbol-overview.component';
import { AdvancedChartComponent } from './charts/advanced-chart.component';
import { MiniChartComponent } from './charts/mini-chart.component';
import { MarketOverviewComponent } from './watchlists/market-overview.component';
import { HotlistsComponent } from './watchlists/hotlists.component';
import { MarketQuotesComponent } from './watchlists/market-quotes.component';
import { TickerTapeComponent } from './tickers/ticker-tape.component';
import { TickerComponent } from './tickers/ticker.component';
import { SingleTickerComponent } from './tickers/single-ticker.component';
import { CryptoCoinsHeatmapComponent } from './heatmaps/crypto-coins-heatmap.component';
import { EtfHeatmapComponent } from './heatmaps/etf-heatmap.component';
import { ForrexHeatmapComponent } from './heatmaps/forex-heat-map.component';
import { StockHeatmapComponent } from './heatmaps/stock-heatmap.component';
import { ForexCrossRatesComponent } from './heatmaps/forex-cross-rates.component';
import { ScreenerComponent } from './screeners/screener.component';
import { CryptocurrencyMarketComponent } from './screeners/cryptocurrency-market.component';
import { SymbolFinancialsDataComponent } from './symbol/symbol-financials-data.component';
import { SymbolInfoComponent } from './symbol/symbol-info.component';
import { SymbolProfileComponent } from './symbol/symbol-profile.component';
import { SymbolTechnicalAnalysisComponent } from './symbol/symbol-technical-analysis.component';
import { NewsComponent } from './news/top-stories.component';

@NgModule({
  declarations: [
    SymbolOverviewComponent,
    AdvancedChartComponent,
    MiniChartComponent,
    MarketOverviewComponent,
    HotlistsComponent,
    MarketQuotesComponent,
    TickerTapeComponent,
    TickerComponent,
    SingleTickerComponent,
    CryptoCoinsHeatmapComponent,
    EtfHeatmapComponent,
    ForrexHeatmapComponent,
    StockHeatmapComponent,
    ForexCrossRatesComponent,
    ScreenerComponent,
    CryptocurrencyMarketComponent,
    SymbolFinancialsDataComponent,
    SymbolInfoComponent,
    SymbolProfileComponent,
    SymbolTechnicalAnalysisComponent,
    NewsComponent
    
  ],
  imports: [
    CommonModule,
    NbCardModule,
    FormsModule,
    NbMenuModule,
    NbSelectModule

  ],
  exports: [
    SymbolOverviewComponent,
    AdvancedChartComponent,
    MiniChartComponent,
    MarketOverviewComponent,
    HotlistsComponent,
    MarketQuotesComponent,
    TickerTapeComponent,
    SingleTickerComponent,
    TickerComponent,
    CryptoCoinsHeatmapComponent,
    EtfHeatmapComponent,
    ForrexHeatmapComponent,
    StockHeatmapComponent,
    ForexCrossRatesComponent,
    ScreenerComponent,
    CryptocurrencyMarketComponent,
    SymbolFinancialsDataComponent,
    SymbolInfoComponent,
    SymbolProfileComponent,
    SymbolTechnicalAnalysisComponent,
    NewsComponent
   
  ]
})
export class TradingChartsModule { }
