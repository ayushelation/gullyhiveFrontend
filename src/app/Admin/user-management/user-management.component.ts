// admin/user-management/user-management.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { AdminModule } from "../admin.module";

interface User {
  userId: number;
  userName: string;
  password: string;
}

@Component({
  selector: 'app-user-management',
  // standalone: true,
  // imports: [
  //   CommonModule,
  //   RouterModule,
  //   HttpClientModule,
  //   HeaderComponent,
  //   FooterComponent
  // ],
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
})
export class UserManagementComponent implements OnInit {
  users: User[] = [];
  loading = true;
  error: string | null = null;
  apiUrl = '/api/home/userdata'; 

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;
    this.error = null;

    // Uncomment this when your API is ready
    // this.http.get<User[]>(this.apiUrl)
    this.http.get<User[]>(this.apiUrl)
      .pipe(
        catchError((error) => {
          console.error('Error fetching users:', error);
          this.error = 'Failed to load users. Using Empty Array.';
          // Return mock data as fallback
          return of([]);
        })
      )
      .subscribe({
        next: (data) => {
          this.users = data;
          this.loading = false;
        },
        error: (err) => {
          console.error('Subscription error:', err);
          this.error = 'An error occurred while loading users.';
          this.users = []; // Fallback to Empty
          this.loading = false;
        }
      });
  }

  // Format password for display (showing only first 3 chars)
  getDisplayPassword(password: string): string {
    if (password.length > 3) {
      return password.substring(0, 3) + '••••••';
    }
    return '••••••';
  }

  // Copy user data to clipboard
  copyUserData(user: User) {
    const userData = `User ID: ${user.userId}\nUsername: ${user.userName}\nPassword: ${user.password}`;
    navigator.clipboard.writeText(userData)
      .then(() => {
        alert('User data copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy:', err);
      });
  }

  // Add a new user (for demo purposes)
  addNewUser() {
    const newUser: User = {
      userId: this.users.length + 1,
      userName: `NewUser${this.users.length + 1}`,
      password: 'default@123'
    };
    this.users = [...this.users, newUser];
  }

  // Delete a user
  deleteUser(userId: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.users = this.users.filter(user => user.userId !== userId);
    }
  }

  // Refresh users
  refreshUsers() {
    this.loadUsers();
  }
}