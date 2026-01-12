// admin/admin.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';

// Layout Components
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';

// Dashboard Components
import { DashboardComponent } from './dashboard/dashboard.component';
import { StatsCardsComponent } from './stats-cards/stats-cards.component';
import { RecentLeadsComponent } from './recent-leads/recent-leads.component';
import { LeadChartComponent } from './lead-chart/lead-chart.component';
import { QuickActionsComponent } from './quick-actions/quick-actions.component';

@NgModule({
  declarations: [
    // Layout Components
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    
    // Dashboard Components
    DashboardComponent,
    StatsCardsComponent,
    RecentLeadsComponent,
    LeadChartComponent,
    QuickActionsComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent
  ]
})
export class AdminModule { }