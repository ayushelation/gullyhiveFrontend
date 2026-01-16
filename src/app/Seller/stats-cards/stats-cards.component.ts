// import { Component,Input } from '@angular/core';
// import { NgModule } from '@angular/core';

// @Component({
//   selector: 'app-stats-cards',
//   templateUrl: './stats-cards.component.html'
// })
// export class StatsCardsComponent {
//   @Input() user: any; 
//   stats = [
//     {
//       label: 'New Leads',
//       value: '12',
//       change: '+3 today',
//       icon: 'ri-mail-line',
//       color: 'bg-orange-50 text-orange-600',
//       trend: 'up'
//     },
//     {
//       label: 'Active Responses',
//       value: '8',
//       change: '2 pending',
//       icon: 'ri-chat-3-line',
//       color: 'bg-green-50 text-green-600',
//       trend: 'up'
//     },
//     {
//       label: 'Profile Views',
//       value: '156',
//       change: '+24 this week',
//       icon: 'ri-eye-line',
//       color: 'bg-indigo-50 text-indigo-600',
//       trend: 'up'
//     },
//     {
//       label: 'Response Rate',
//       value: '94%',
//       change: 'Excellent',
//       icon: 'ri-line-chart-line',
//       color: 'bg-teal-50 text-teal-600',
//       trend: 'up'
//     }
//   ];
// }

import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-stats-cards',
  templateUrl: './stats-cards.component.html'
})
export class StatsCardsComponent implements OnChanges {
  @Input() totalLeads = 0;
  @Input() totalResponses = 0;
  @Input() acceptedResponses = 0;
  @Input() pendingResponses = 0;

  stats: any[] = [];

  ngOnChanges() {
    // Update stats whenever inputs change
    this.stats = [
      {
        label: 'New Leads',
        value: this.totalLeads,
        change: '+3 today', // Optional: dynamic if you track new leads
        icon: 'ri-mail-line',
        color: 'bg-orange-50 text-orange-600',
        trend: 'up'
      },
      {
        label: 'Active Responses',
        value: this.totalResponses,
        change: `${this.pendingResponses} pending`,
        icon: 'ri-chat-3-line',
        color: 'bg-green-50 text-green-600',
        trend: 'up'
      },
      {
        label: 'Accepted Responses',
        value: this.acceptedResponses,
        change: '',
        icon: 'ri-check-line',
        color: 'bg-teal-50 text-teal-600',
        trend: 'up'
      },
      {
        label: 'Response Rate',
        value: this.totalResponses > 0 ? `${Math.round((this.acceptedResponses/this.totalResponses)*100)}%` : '0%',
        change: 'Excellent',
        icon: 'ri-line-chart-line',
        color: 'bg-indigo-50 text-indigo-600',
        trend: 'up'
      }
    ];
  }
}

