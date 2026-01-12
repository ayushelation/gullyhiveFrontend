import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';


 import { AuthService } from '../auth.service';
 import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html'
})



export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading = false;
  showPassword = false;

   userName = '';
  password = '';
  error = '';
  loading = false;

  constructor(private auth: AuthService,
    private fb: FormBuilder,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }


  login() {
    this.error = '';
    this.loading = true;

    this.auth.login(this.userName, this.password).subscribe({
      next: (res) => {
        this.auth.saveAuth(res.token, res.role, res.name);
        this.auth.redirectByRole(res.role);
      },
      error: (err) => {
        this.error = err.error ?? 'Invalid login credentials';
        this.loading = false;
      }
    });
  }



  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const savedEmail = localStorage.getItem('rememberedEmail');
      if (savedEmail) {
        this.loginForm.patchValue({
          email: savedEmail,
          rememberMe: true
        });
      }
    }
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      
      setTimeout(() => {
        const formValue = this.loginForm.value;
        
        if (isPlatformBrowser(this.platformId)) {
          if (formValue.rememberMe) {
            localStorage.setItem('rememberedEmail', formValue.email);
          } else {
            localStorage.removeItem('rememberedEmail');
          }
        }
        
        console.log('Login attempt with:', formValue);
        alert(`Login successful! Welcome ${formValue.email}`);
        this.isLoading = false;
        
        this.loginForm.reset({
          email: formValue.rememberMe ? formValue.email : '',
          password: '',
          rememberMe: formValue.rememberMe
        });
      }, 1500);
    }
  }

  forgotPassword(event: Event): void {
    event.preventDefault();
    const email = this.loginForm.get('email')?.value;
    
    if (email) {
      alert(`Password reset link sent to ${email}`);
    } else {
      const userEmail = prompt('Please enter your email to reset password:');
      if (userEmail) {
        alert(`Password reset link sent to ${userEmail}`);
      }
    }
  }

  sendMagicLink(): void {
    const email = this.loginForm.get('email')?.value;
    
    if (!email) {
      const userEmail = prompt('Please enter your email for the magic link:');
      if (userEmail) {
        alert(`Magic link sent to ${userEmail}`);
      }
    } else {
      alert(`Magic link sent to ${email}`);
    }
  }

  loginWithApple(): void {
    this.isLoading = true;
    setTimeout(() => {
      alert('Redirecting to Apple login...');
      this.isLoading = false;
    }, 1000);
  }

  loginWithGoogle(): void {
    this.isLoading = true;
    setTimeout(() => {
      alert('Redirecting to Google login...');
      this.isLoading = false;
    }, 1000);
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}