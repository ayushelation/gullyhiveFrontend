import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
 import { environment } from '../../environments/environment';
//import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = `${environment.apiBaseUrl}/home`;

  constructor(private http: HttpClient) {}

  getAdminDashboard() {
    return this.http.get(`${this.apiUrl}/admin`);
  }
}
