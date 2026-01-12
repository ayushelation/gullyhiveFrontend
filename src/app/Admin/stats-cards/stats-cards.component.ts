// admin/stats-cards/stats-cards.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface StatCard {
  title: string;
  value: string;
  icon: string;
  color: string;
  bgColor: string;
  trend: {
    value: string;
    isPositive: boolean;
    label: string;
  };
}

@Component({
  selector: 'app-stats-cards',
  templateUrl: './stats-cards.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class StatsCardsComponent {
  stats: StatCard[] = [
    {
      title: 'Total Leads',
      value: '1,248',
      icon: 'users',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      trend: {
        value: '+12.5%',
        isPositive: true,
        label: 'from last month'
      }
    },
    {
      title: 'Conversion Rate',
      value: '24.3%',
      icon: 'trend-up',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      trend: {
        value: '+3.2%',
        isPositive: true,
        label: 'from last month'
      }
    },
    {
      title: 'Pending Leads',
      value: '48',
      icon: 'clock',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      trend: {
        value: '-5',
        isPositive: false,
        label: 'Requires follow-up'
      }
    },
    {
      title: 'Revenue Generated',
      value: '$24,580',
      icon: 'currency',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100',
      trend: {
        value: '+18.2%',
        isPositive: true,
        label: 'from last month'
      }
    }
  ];

  getIconPath(iconName: string): string {
    const icons: { [key: string]: string } = {
      users: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
      'trend-up': 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
      clock: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
      currency: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
    };
    return icons[iconName] || '';
  }
}