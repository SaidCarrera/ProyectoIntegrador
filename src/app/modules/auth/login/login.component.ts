import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <mat-card class="max-w-md w-full p-6">
        <mat-card-header>
          <mat-card-title>Login</mat-card-title>
        </mat-card-header>
        
        <mat-card-content>
          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="flex flex-col gap-4">
            <mat-form-field>
              <mat-label>Email</mat-label>
              <input matInput formControlName="email" type="email" required>
              <mat-error *ngIf="loginForm.get('email')?.hasError('required')">
                Email is required
              </mat-error>
              <mat-error *ngIf="loginForm.get('email')?.hasError('email')">
                Please enter a valid email
              </mat-error>
            </mat-form-field>

            <mat-form-field>
              <mat-label>Password</mat-label>
              <input matInput formControlName="password" type="password" required>
              <mat-error *ngIf="loginForm.get('password')?.hasError('required')">
                Password is required
              </mat-error>
            </mat-form-field>

            <button mat-raised-button color="primary" type="submit" 
                    [disabled]="loginForm.invalid || isLoading">
              {{ isLoading ? 'Logging in...' : 'Login' }}
            </button>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const { email, password } = this.loginForm.value;
      
      this.authService.login({ email, password }).subscribe({
        next: (user) => {
          this.isLoading = false;
          // Redirect based on user role
          if (user.role === 'admin') {
            this.router.navigate(['/dashboard']);
          } else {
            this.router.navigate(['/books']);
          }
        },
        error: (error) => {
          this.isLoading = false;
          // TODO: Show error message
          console.error('Login failed:', error);
        }
      });
    }
  }
}