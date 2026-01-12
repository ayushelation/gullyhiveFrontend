

import { Component, OnInit } from '@angular/core';
import { SellerService } from '../seller.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: any;

  constructor(private sellerService: SellerService) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.sellerService.getDashboardData().subscribe({
      next: dashboard => {
        console.log('Dashboard data:', dashboard);
        this.user = dashboard; // 👈 STORE FULL DASHBOARD
      },
      error: err => console.error('Failed to load dashboard data', err)
    });
  }
}


