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
  selector: 'app-register',
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
          <mat-card-title>Register</mat-card-title>
        </mat-card-header>
        
        <mat-card-content>
          <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="flex flex-col gap-4">
            <mat-form-field>
              <mat-label>Name</mat-label>
              <input matInput formControlName="name" required>
              <mat-error *ngIf="registerForm.get('name')?.hasError('required')">
                Name is required
              </mat-error>
            </mat-form-field>

            <mat-form-field>
              <mat-label>Email</mat-label>
              <input matInput formControlName="email" type="email" required>
              <mat-error *ngIf="registerForm.get('email')?.hasError('required')">
                Email is required
              </mat-error>
              <mat-error *ngIf="registerForm.get('email')?.hasError('email')">
                Please enter a valid email
              </mat-error>
            </mat-form-field>

            <mat-form-field>
              <mat-label>Password</mat-label>
              <input matInput formControlName="password" type="password" required>
              <mat-error *ngIf="registerForm.get('password')?.hasError('required')">
                Password is required
              </mat-error>
              <mat-error *ngIf="registerForm.get('password')?.hasError('minlength')">
                Password must be at least 6 characters
              </mat-error>
            </mat-form-field>

            <button mat-raised-button color="primary" type="submit" 
                    [disabled]="registerForm.invalid || isLoading">
              {{ isLoading ? 'Registering...' : 'Register' }}
            </button>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `
})
export class RegisterComponent {
  registerForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      this.authService.register(this.registerForm.value).subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['/login']);
        },
        error: (error) => {
          this.isLoading = false;
          // TODO: Show error message
          console.error('Registration failed:', error);
        }
      });
    }
  }
}