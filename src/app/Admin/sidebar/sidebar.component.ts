// admin/sidebar/sidebar.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule  // Add RouterModule here
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems = [
    { 
      icon: 'dashboard', 
      label: 'Dashboard', 
      path: '/admin', 
      active: false 
    },
    { 
    icon: 'users', 
    label: 'User Management',  // Add this
    path: '/admin/user-management', 
    active: false 
  },
    { 
      icon: 'users', 
      label: 'Leads', 
      path: '/admin/leads', 
      active: false 
    },
    { 
      icon: 'chart', 
      label: 'Analytics', 
      path: '/admin/analytics', 
      active: false 
    },
    { 
      icon: 'team', 
      label: 'Team', 
      path: '/admin/team', 
      active: false 
    },
    { 
      icon: 'settings', 
      label: 'Settings', 
      path: '/admin/settings', 
      active: false 
    }
  ];

  quickActions = [
    { 
      icon: 'plus', 
      label: 'Add New Lead', 
      color: 'text-green-500' 
    },
    { 
      icon: 'document', 
      label: 'Generate Report', 
      color: 'text-blue-500' 
    }
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    this.updateActiveLink(this.router.url);
    
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.updateActiveLink(event.url);
    });
  }

  updateActiveLink(url: string) {
    this.menuItems.forEach(item => {
      item.active = url === item.path || url.startsWith(item.path + '/');
    });
  }

  getIconPath(iconName: string): string {
    const icons: { [key: string]: string } = {
      dashboard: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
      users: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-4.201V5a2 2 0 00-2-2H4a2 2 0 00-2 2v13.5A1.5 1.5 0 003.5 20h9a1.5 1.5 0 001.5-1.5zm-6-9A1.5 1.5 0 119.5 7 1.5 1.5 0 0112 7.5z',
      chart: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
      team: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
      settings: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
      plus: 'M12 6v6m0 0v6m0-6h6m-6 0H6',
      document: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'
    };
    return icons[iconName] || '';
  }
}