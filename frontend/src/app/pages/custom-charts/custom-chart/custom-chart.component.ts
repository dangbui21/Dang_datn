import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { GridsterConfig, GridsterItem } from 'angular-gridster2';
import { CustomChartService } from '../custom-chart.service';
import { NbToastrService, NbGlobalPosition, NbGlobalPhysicalPosition } from '@nebular/theme';

// Thêm export cho interface
export interface DashboardItem extends GridsterItem {
  type: string;
  locked?: boolean;
  dragEnabled?: boolean;
  resizeEnabled?: boolean;
}

@Component({
  selector: 'ngx-custom-chart',
  templateUrl: './custom-chart.component.html',
  styleUrls: ['./custom-chart.component.scss']
})
export class CustomChartComponent implements OnInit {
  options: GridsterConfig;
  dashboard: Array<DashboardItem>;
  availableCharts: Array<string> = [
    // Advanced Charts
    'AdvancedChart',
    'MiniChart',
    'SymbolOverview',
    
    // Heatmaps
    'EtfHeatmap',
    'StockHeatmap',
    'CryptoCoinsHeatmap',
    'ForexCrossRates',
    'ForexHeatmap',
    
    // Market Data
    'HotList',
    'MarketOverview',
    'MarketQuotes',
    
    // News
    'News',

    // Screener
    'CryptocurrencyMarket',
    'Screener',
    
    // Symbol Info
    'SymbolFinancialsData',
    'SymbolInfo',
    'SymbolProfile',
    'SymbolTechnicalAnalysis',
    
    // Tickers
    'SingleTicker',
    'Ticker',
    'TickerTape'
  ];
  selectedChart: string;
  isChartSelectorVisible = true;
  isDragging = false;
  isResizing = false;
  activeItem: DashboardItem | null = null;
  gridsterElement: HTMLElement;

  constructor(
    private elementRef: ElementRef,
    private customChartService: CustomChartService,
    private toastrService: NbToastrService,
  ) {}

  ngOnInit() {
    this.gridsterElement = this.elementRef.nativeElement.querySelector('gridster') as HTMLElement;
    this.options = {
      gridType: 'scrollVertical',
      draggable: {
        enabled: true,
        ignoreContent: false,
        dragHandleClass: 'drag-handler',
        start: this.onDragStart.bind(this),
        stop: this.onDragStop.bind(this)
      },
      resizable: {
        enabled: true,
        handles: {
          s: true,
          e: true,
          n: true,
          w: true,
          se: true,
          ne: true,
          sw: true,
          nw: true
        },
        start: this.onResizeStart.bind(this),
        stop: this.onResizeStop.bind(this)
      },
      pushItems: true,
      disablePushOnDrag: false,
      disablePushOnResize: false,
      pushDirections: { north: true, east: true, south: true, west: true },
      itemChangeCallback: (item: DashboardItem) => {
        // Ngăn chặn việc di chuyển các item đã khóa
        const itemInDashboard = this.dashboard.find(i => 
          i.x === item.x && 
          i.y === item.y && 
          i.locked
        );
        
        if (itemInDashboard) {
          return false;
        }
        return true;
      },
      collision: {
        // Xử lý va chạm với item đã khóa
        detectOnlyWithinSameRow: false,
        detectEvery: 1,
        // Không cho phép đẩy các item đã khóa
        checkCollision: (item: DashboardItem, newItem: DashboardItem) => {
          const existingItem = this.dashboard.find(i => 
            i.x === item.x && 
            i.y === item.y
          );
          return existingItem && existingItem.locked ? true : false;
        }
      }
    };

    this.dashboard = [
      { cols: 4, rows: 4, y: 0, x: 0, type: 'AdvancedChart', dragEnabled: true, resizeEnabled: true },
      { cols: 4, rows: 4, y: 0, x: 4, type: 'SymbolOverview', dragEnabled: true, resizeEnabled: true },
    ];
  }

  toggleLock(item: DashboardItem) {
    item.locked = !item.locked;
    this.dashboard = [...this.dashboard];
  }

  onItemResize(item: DashboardItem, itemComponent: any) {
    return true;
  }

  onItemChange(item: DashboardItem, itemComponent: any) {
    return true;
  }

  onDragStart(event: MouseEvent): boolean {
    return true;
  }

  onDragStop() {
    this.isDragging = false;
    this.activeItem = null;
  }

  onResizeStart(event: MouseEvent): boolean {
    if (event.button !== 0) return false;
    
    const targetElement = (event.target as HTMLElement);
    const gridsterItem = targetElement.closest('gridster-item');
    const itemElement = gridsterItem?.querySelector('nb-card');
    
    if (itemElement) {
      const itemIndex = this.dashboard.findIndex(item => 
        item.type === itemElement.querySelector('.nb-text')?.textContent
      );
      
      if (itemIndex !== -1 && this.dashboard[itemIndex].locked) {
        return false;
      }
    }

    if (!this.isMouseInGridster(event)) {
      return false;
    }

    this.isResizing = true;
    return true;
  }

  onResizeStop() {
    this.isResizing = false;
    this.activeItem = null;
  }

  isMouseInGridster(event: MouseEvent): boolean {
    if (!this.gridsterElement) return false;
    
    const rect = this.gridsterElement.getBoundingClientRect();
    return (
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom
    );
  }

  toggleChartSelector() {
    this.isChartSelectorVisible = !this.isChartSelectorVisible;
  }

  addChart() {
    if (this.selectedChart) {
      this.dashboard.push({ 
        cols: 4, 
        rows: 4, 
        y: 0, 
        x: 0, 
        type: this.selectedChart,
        dragEnabled: true,
        resizeEnabled: true
      });
      this.selectedChart = null;
      this.isChartSelectorVisible = false;
    }
  }

  saveDashboard() {
    this.customChartService.saveDashboardConfig(this.dashboard)
      .subscribe({
        next: () => {
          console.log('Dashboard saved successfully');
          this.toastrService.success('Cấu hình đã được lưu thành công', 'Thành công', {
            duration: 3000,
            position: NbGlobalPhysicalPosition.TOP_RIGHT
          });
        },
        error: (error) => {
          console.error('Error saving dashboard:', error);
          this.toastrService.danger(
            'Không thể lưu cấu hình. Vui lòng thử lại sau.',
            'Lỗi',
            {
              duration: 5000,
              position: NbGlobalPhysicalPosition.TOP_RIGHT
            }
          );
        }
      });
  }

  removeItem(item: DashboardItem) {
    if (item.locked) {
      this.toastrService.warning(
        'Không thể xóa biểu đồ đã khóa',
        'Cảnh báo',
        {
          duration: 3000,
          position: NbGlobalPhysicalPosition.TOP_RIGHT
        }
      );
      return;
    }

    const index = this.dashboard.indexOf(item);
    if (index > -1) {
      this.dashboard.splice(index, 1);
      this.toastrService.success(
        'Đã xóa biểu đồ thành công',
        'Thành công',
        {
          duration: 3000,
          position: NbGlobalPhysicalPosition.TOP_RIGHT
        }
      );
    }
  }
}
