import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {
  private apiUrl = `${environment.apiUrl}/admin`;

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users`);
  }

  searchUsers(searchTerm: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/search`, {
      params: { searchTerm }
    });
  }

  updateUserStatus(userId: number, status: string): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/users/${userId}/status`, 
      { status }
    );
  }
} 