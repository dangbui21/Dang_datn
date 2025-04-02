import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WatchlistService } from '../../../@core/services/watchlist.service';
import { NbToastrService } from '@nebular/theme';


@Component({
  selector: 'ngx-stock-info',
  templateUrl: './stock-info.component.html',
  styleUrls: ['./stock-info.component.scss']
})
export class StockInfoComponent implements OnInit, OnDestroy {
  symbol: string;
  watchlist: any[] = [];
  private destroy$ = new Subject<void>();
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private watchlistService: WatchlistService,
    private toastrService: NbToastrService,
  ) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    console.log('Current token in component:', token);

    this.route.params
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        this.symbol = params['symbol'];
        if (token) {
          console.log('User is logged in, loading watchlist...');
          this.loadWatchlist();
        } else {
          console.log('No token found in localStorage');
          this.toastrService.warning('Please login to use watchlist features', 'Login Required');
        }
      });
  }

  loadWatchlist() {
    this.watchlistService.getWatchlist()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.watchlist = data;
        },
        error: (error) => {
          this.toastrService.danger('Error loading watchlist', 'Error');
        }
      });
  }

  addToWatchlist() {
    this.watchlistService.addToWatchlist(this.symbol)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.toastrService.success('Added to watchlist', 'Success');
          this.loadWatchlist(); // Reload watchlist
        },
        error: (error) => {
          this.toastrService.danger('Error adding to watchlist', 'Error');
        }
      });
  }

  removeFromWatchlist() {
    this.watchlistService.removeFromWatchlist(this.symbol)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.toastrService.success('Removed from watchlist', 'Success');
          this.loadWatchlist(); // Reload watchlist
        },
        error: (error) => {
          this.toastrService.danger('Error removing from watchlist', 'Error');
        }
      });
  }

  onWatchlistSelect(symbol: string) {
    this.router.navigate(['/pages/my-page/stock', symbol]);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  
  
} 