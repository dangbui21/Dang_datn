import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DashboardItem } from './custom-chart/custom-chart.component';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomChartService {
  private configPath = 'assets/data/dashboard-config.json';
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  // Lưu cấu hình vào file JSON
  saveDashboardConfigToJson(dashboard: Array<DashboardItem>): Observable<any> {
    const config = { dashboard };
    return this.http.post(`${this.apiUrl}/save-dashboard/json`, config);
  }

  // Lưu cấu hình vào MySQL
  saveDashboardConfigToSQL(dashboard: Array<DashboardItem>, userId: number): Observable<any> {
    const payload = {
      userId: userId,
      dashboardData: dashboard
    };
    return this.http.post(`${this.apiUrl}/save-dashboard/sql`, payload);
  }

  // Đọc cấu hình từ file JSON
  loadDashboardConfigFromJson(): Observable<Array<DashboardItem>> {
    return this.http.get<{ dashboard: Array<DashboardItem> }>(this.configPath)
      .pipe(
        map(response => {
          console.log('Loaded dashboard config from JSON:', response);
          return response.dashboard;
        })
      );
  }

  // Đọc cấu hình từ MySQL
  loadDashboardConfigFromSQL(userId: number): Observable<Array<DashboardItem>> {
    return this.http.get<Array<DashboardItem>>(`${this.apiUrl}/load-dashboard/sql`, {
      params: { userId: userId.toString() }
    });
  }
}
