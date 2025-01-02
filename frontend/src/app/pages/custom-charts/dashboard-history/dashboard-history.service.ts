import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { DashboardItem } from '../custom-chart/custom-chart.component';

@Injectable({
  providedIn: 'root'
})
export class DashboardHistoryService {
  private apiUrl = 'http://localhost:3000/api/dashboard';
  private dashboardUpdateSource = new BehaviorSubject<DashboardItem[]>([]);
  
  dashboardUpdate$ = this.dashboardUpdateSource.asObservable();

  constructor(private http: HttpClient) {}

  getHistoryList(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/history/${userId}`);
  }

  getHistoryDetail(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/detail/${id}`);
  }

  applyHistoryConfig(id: number, userId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/apply/${id}`, { userId });
  }

  updateDashboard(dashboard: DashboardItem[]) {
    this.dashboardUpdateSource.next(dashboard);
  }

  deleteHistory(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/history/${id}`);
  }
} 