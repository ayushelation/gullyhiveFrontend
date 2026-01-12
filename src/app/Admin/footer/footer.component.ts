// admin/footer/footer.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-footer',
  templateUrl: './footer.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}