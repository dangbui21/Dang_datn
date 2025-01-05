import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {
  private apiUrl = `${environment.apiUrl}/watchlist`;

  constructor(private http: HttpClient) { }

  getWatchlist(): Observable<any[]> {
    const token = localStorage.getItem('token');
    console.log('Token being used:', token);

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.get<any[]>(this.apiUrl, { headers }).pipe(
      tap(response => console.log('Watchlist API response:', response)),
      catchError(error => {
        console.error('Watchlist API error:', error);
        return throwError(() => error);
      })
    );
  }

  addToWatchlist(symbol: string): Observable<any> {
    const token = localStorage.getItem('token');
    console.log('Token being used for add:', token);

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.post(this.apiUrl, { symbol }, { headers }).pipe(
      tap(response => console.log('Add to watchlist response:', response)),
      catchError(error => {
        console.error('Add to watchlist error:', error);
        return throwError(() => error);
      })
    );
  }
} 