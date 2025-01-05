import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StockSearchService {
  private apiUrl = `${environment.apiUrl}/stocks`;

  constructor(private http: HttpClient) { }

  searchStocks(symbol: string): Observable<any> {
    console.log('Calling API:', `${this.apiUrl}/search?symbol=${symbol}`);
    return this.http.get(`${this.apiUrl}/search?symbol=${symbol}`);
  }
} 