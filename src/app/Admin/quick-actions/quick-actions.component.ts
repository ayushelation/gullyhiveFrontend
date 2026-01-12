// admin/quick-actions/quick-actions.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface QuickAction {
  title: string;
  description: string;
  icon: string;
  color: string;
  action: string;
}

@Component({
  selector: 'app-quick-actions',
  templateUrl: './quick-actions.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class QuickActionsComponent {
  actions: QuickAction[] = [
    {
      title: 'Import Leads',
      description: 'Upload CSV or Excel file with new leads',
      icon: 'cloud-upload',
      color: 'bg-blue-100 text-blue-600',
      action: 'import'
    },
    {
      title: 'Send Campaign',
      description: 'Create and send email campaign to leads',
      icon: 'mail',
      color: 'bg-green-100 text-green-600',
      action: 'campaign'
    },
    {
      title: 'Generate Report',
      description: 'Create detailed analytics report',
      icon: 'document-report',
      color: 'bg-purple-100 text-purple-600',
      action: 'report'
    },
    {
      title: 'Add Team Member',
      description: 'Invite new team member to dashboard',
      icon: 'user-add',
      color: 'bg-orange-100 text-orange-600',
      action: 'addMember'
    }
  ];

  getIconPath(iconName: string): string {
    const icons: { [key: string]: string } = {
      'cloud-upload': 'M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10',
      'mail': 'M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
      'document-report': 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
      'user-add': 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z'
    };
    return icons[iconName] || '';
  }

  handleAction(action: string) {
    // Handle the action here
    console.log('Action triggered:', action);
    // You can implement navigation or service calls based on the action
  }
}