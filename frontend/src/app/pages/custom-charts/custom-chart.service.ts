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

  constructor(private http: HttpClient) {}

  // Lưu cấu hình vào file JSON
  saveDashboardConfig(dashboard: Array<DashboardItem>): Observable<any> {
    const config = { dashboard };
    return this.http.post('http://localhost:3000/api/save-dashboard/json', config);

  }

  // Đọc cấu hình từ file JSON
  loadDashboardConfig(): Observable<Array<DashboardItem>> {
    return this.http.get<{ dashboard: Array<DashboardItem> }>(this.configPath)
      .pipe(
        map(response => {
          console.log('Loaded dashboard config:', response);  // Kiểm tra dữ liệu trả về từ API
          return response.dashboard;
        })
      );
  }
  
}
