// import { Component, Input } from '@angular/core';

// @Component({
//   selector: 'app-quick-actions',
//   templateUrl: './quick-actions.component.html'
// })
// export class QuickActionsComponent {
//   @Input() user: any; 
//   actions = [
//     {
//       title: 'View New Leads',
//       description: 'Check out potential customers',
//       icon: 'ri-mail-open-line',
//       link: '/seller/leads',
//       color: 'bg-orange-50 text-orange-600 hover:bg-orange-100'
//     },
//     {
//       title: 'Update Availability',
//       description: 'Manage your schedule',
//       icon: 'ri-calendar-line',
//       link: '/seller/settings/availability',
//       color: 'bg-green-50 text-green-600 hover:bg-green-100'
//     },
//     {
//       title: 'Edit Services',
//       description: 'Update your offerings',
//       icon: 'ri-tools-line',
//       link: '/seller/settings/services',
//       color: 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
//     },
//     {
//       title: 'View Analytics',
//       description: 'Track your performance',
//       icon: 'ri-bar-chart-box-line',
//       link: '/seller/analytics',
//       color: 'bg-teal-50 text-teal-600 hover:bg-teal-100'
//     }
//   ];
// }


import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-quick-actions',
  templateUrl: './quick-actions.component.html'
})
export class QuickActionsComponent {
  @Output() editServices = new EventEmitter<void>();

  actions = [
    {
      title: 'View New Leads',
      icon: 'ri-mail-open-line',
      link: '/seller/leads',
      color: 'bg-orange-50 text-orange-600'
    },
    {
      title: 'Edit Services',
      icon: 'ri-tools-line',
      action: 'editServices',
      color: 'bg-indigo-50 text-indigo-600'
    }
  ];

onAction(action: any) {
  if (action.action === 'editServices') {
    this.editServices.emit(); // triggers DashboardComponent.openEditServices()
  }
}

}
