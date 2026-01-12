import { Component,Input } from '@angular/core';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-stats-cards',
  templateUrl: './stats-cards.component.html'
})
export class StatsCardsComponent {
  @Input() user: any; 
  stats = [
    {
      label: 'New Leads',
      value: '12',
      change: '+3 today',
      icon: 'ri-mail-line',
      color: 'bg-orange-50 text-orange-600',
      trend: 'up'
    },
    {
      label: 'Active Responses',
      value: '8',
      change: '2 pending',
      icon: 'ri-chat-3-line',
      color: 'bg-green-50 text-green-600',
      trend: 'up'
    },
    {
      label: 'Profile Views',
      value: '156',
      change: '+24 this week',
      icon: 'ri-eye-line',
      color: 'bg-indigo-50 text-indigo-600',
      trend: 'up'
    },
    {
      label: 'Response Rate',
      value: '94%',
      change: 'Excellent',
      icon: 'ri-line-chart-line',
      color: 'bg-teal-50 text-teal-600',
      trend: 'up'
    }
  ];
}
