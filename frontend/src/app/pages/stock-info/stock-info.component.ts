import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ngx-stock-info',
  templateUrl: './stock-info.component.html',
  styleUrls: ['./stock-info.component.scss']
})
export class StockInfoComponent implements OnInit, OnDestroy {
  symbol: string;
  private destroy$ = new Subject<void>();

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        this.symbol = params['symbol'];
        console.log('StockInfo component received symbol:', this.symbol);
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
} 