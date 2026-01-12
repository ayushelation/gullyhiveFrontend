// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-leads',
//   templateUrl: './leads.component.html',
//   styleUrls: ['./leads.component.css']
// })
// export class LeadsComponent {
//  // showUserMenu = false;
//   filterStatus: 'all' | 'new' | 'responded' | 'viewed' = 'all';

//   leads = [
//     {
//       id: 1,
//       name: 'Sarah Johnson',
//       service: 'Home Cleaning',
//       location: 'Downtown, New York',
//       time: '2 hours ago',
//       budget: '$150-$200',
//       status: 'new',
//       avatar: 'SJ',
//       description: 'Need deep cleaning for a 3-bedroom apartment.',
//       urgency: 'urgent'
//     },
//     {
//       id: 2,
//       name: 'Michael Chen',
//       service: 'AC Repair',
//       location: 'Brooklyn, New York',
//       time: '5 hours ago',
//       budget: '$100-$150',
//       status: 'responded',
//       avatar: 'MC',
//       description: 'AC not cooling properly.',
//       urgency: 'normal'
//     }
//   ];
  
//   setFilter(status: any) {
//     this.filterStatus = status;
//   }

//   get filteredLeads() {
//     return this.filterStatus === 'all'
//       ? this.leads
//       : this.leads.filter(l => l.status === this.filterStatus);
//   }

// }

import { Component, OnInit } from '@angular/core';

import { SellerService, Lead } from '../seller.service';

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.css']
})
export class LeadsComponent implements OnInit {
  filterStatus: 'all' | 'new' | 'responded' | 'viewed' = 'all';
  leads: Lead[] = [];
  loading = true;

  constructor(private sellerService: SellerService) {}

  ngOnInit(): void {
    this.loadLeads();
  }

  loadLeads() {
    this.sellerService.getLeads().subscribe({
      next: (data) => {
        this.leads = data.map(l => ({
          ...l,
          name: l.customerName,     // map API fields to template
          service: l.serviceName,
          location: l.location,
          budget: l.budgetMin && l.budgetMax ? `₹${l.budgetMin} - ₹${l.budgetMax}` : 'N/A',
          status: l.status,
          time: new Date(l.createdAt).toLocaleString()
        }));
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load leads', err);
        this.loading = false;
      }
    });
  }

  setFilter(status: any) {
    this.filterStatus = status;
  }

  get filteredLeads() {
    return this.filterStatus === 'all'
      ? this.leads
      : this.leads.filter(l => l.status === this.filterStatus);
  }
}
