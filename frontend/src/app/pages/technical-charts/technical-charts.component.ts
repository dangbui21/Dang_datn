import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-technical-charts',
  templateUrl: './technical-charts.component.html',
  styleUrls: ['./technical-charts.component.scss']
})
export class TechnicalChartsComponent {
  // title = 'test-charts';
  // currentTheme: string;

  // constructor(private themeService: NbThemeService ,private cdr: ChangeDetectorRef) { }

  // ngOnInit() {
  //   this.currentTheme = this.themeService.currentTheme;//lấy chủ đề hiện tại
  //   this.loadTradingViewWidget(this.currentTheme);// Tải biểu đồ với chủ đề hiện tại

  //   // Theo dõi sự thay đổi chủ đề
  //   this.themeService.onThemeChange().subscribe(theme => {
  //     this.currentTheme = theme.name;
  //     console.log('Chủ đề đã thay đổi:', this.currentTheme); // In ra chủ đề mới
  //     this.loadTradingViewWidget(this.currentTheme);//load lại khi chủ đề chính thay đổi
  //   });
  // }

  // loadTradingViewWidget(theme: string) {

  //     // Xóa các biểu đồ cũ (nếu có) trước khi tạo lại
  //     const oldChart = document.getElementById("tradingview_chart");
  //     if (oldChart) {
  //       oldChart.innerHTML = ''; // Xóa nội dung của phần tử DOM trước khi tái tạo
  //     }
  
  //     const oldWidget = document.getElementById("tradingview_1");
  //     if (oldWidget) {
  //       oldWidget.innerHTML = ''; // Xóa nội dung của phần tử DOM trước khi tái tạo
  //     }

      
  //   console.log('Chủ đề được truyền vào widget:', theme);
  //   new window.TradingView.widget({
  //     "autosize" : true,
  //     "symbol": "NASDAQ:AAPL",
  //     "interval": "D",
  //     "timezone": "Asia/Ho_Chi_Minh",
  //     "theme": (theme === 'dark' || theme === 'cosmic') ? 'dark' : 'light',// xử lý chủ đề của char phù hợp với chủ đề chính
  //     "style": "1",
  //     "locale": "vi_VN",
  //     "enable_publishing": false,
      
  //     "withdateranges": true,
  //     "allow_symbol_change": true,
  //     "watchlist": [
  //       "BINANCE:BTCUSDT",
  //       "BITSTAMP:BTCUSD",
  //       "NASDAQ:AAPL"
  //     ],//danh sách theo dõi
  //     "details": true,//hiện các thông tin khác của mã hiện tại
  //     "hotlist": true,//hiện danh sách hot
  //     "calendar": false,
  //     "studies": [
  //       "STD;Divergence%1Indicator"
  //     ],//danh sách biểu đồ chỉ báo mặc định hiện
  //     "container_id": "tradingview_chart"//Id biểu đồ 
  //   });

    
  // }

}
