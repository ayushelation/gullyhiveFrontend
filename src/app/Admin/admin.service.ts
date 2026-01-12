import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'https://gullyhivebackend-irfi.onrender.com/api/home';

  constructor(private http: HttpClient) {}

  getAdminDashboard() {
    return this.http.get(`${this.apiUrl}/admin`);
  }
}
