// admin/recent-leads/recent-leads.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Lead {
  id: number;
  name: string;
  email: string;
  source: string;
  status: 'New' | 'Contacted' | 'Qualified' | 'Converted';
  date: string;
}

@Component({
  selector: 'app-recent-leads',
  templateUrl: './recent-leads.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class RecentLeadsComponent {
  leads: Lead[] = [
    { id: 1, name: 'John Smith', email: 'john@example.com', source: 'Website', status: 'New', date: '2024-01-15' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', source: 'Social Media', status: 'Contacted', date: '2024-01-14' },
    { id: 3, name: 'Michael Brown', email: 'michael@example.com', source: 'Referral', status: 'Qualified', date: '2024-01-13' },
    { id: 4, name: 'Emily Davis', email: 'emily@example.com', source: 'Website', status: 'Converted', date: '2024-01-12' },
    { id: 5, name: 'Robert Wilson', email: 'robert@example.com', source: 'Email Campaign', status: 'New', date: '2024-01-11' }
  ];

  getStatusClass(status: string): string {
    switch(status) {
      case 'New': return 'badge-primary';
      case 'Contacted': return 'badge-secondary';
      case 'Qualified': return 'badge-success';
      case 'Converted': return 'badge-warning';
      default: return 'badge-secondary';
    }
  }
}