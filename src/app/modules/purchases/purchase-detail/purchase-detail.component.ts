import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PurchaseService } from '../../../core/services/purchase.service';
import { Purchase } from '../../../core/models/purchase.model';

@Component({
  selector: 'app-purchase-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatChipsModule,
    MatButtonModule,
    MatProgressBarModule
  ],
  template: `
    <div class="container mx-auto p-4">
      <mat-card *ngIf="purchase">
        <mat-card-header>
          <mat-card-title>Purchase Details</mat-card-title>
        </mat-card-header>
        
        <mat-card-content class="p-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <h3 class="font-bold">Book</h3>
              <p>{{purchase.book?.title}}</p>
            </div>
            
            <div>
              <h3 class="font-bold">Quantity</h3>
              <p>{{purchase.quantity}}</p>
            </div>
            
            <div>
              <h3 class="font-bold">Total Amount</h3>
              <p>${{purchase.totalAmount}}</p>
            </div>
            
            <div>
              <h3 class="font-bold">Status</h3>
              <mat-chip [color]="getStatusColor(purchase.paymentStatus)" selected>
                {{purchase.paymentStatus}}
              </mat-chip>
            </div>
            
            <div>
              <h3 class="font-bold">Purchase Date</h3>
              <p>{{purchase.createdAt | date}}</p>
            </div>
            
            <div *ngIf="purchase.paymentId">
              <h3 class="font-bold">Payment ID</h3>
              <p>{{purchase.paymentId}}</p>
            </div>
          </div>

          <div *ngIf="purchase.paymentStatus === 'pending'" class="mt-4">
            <h3 class="font-bold mb-2">Payment Verification</h3>
            <mat-progress-bar mode="indeterminate" *ngIf="isVerifying"></mat-progress-bar>
            <button mat-raised-button color="primary" 
                    [disabled]="isVerifying"
                    (click)="verifyPayment()">
              Verify Payment
            </button>
          </div>
        </mat-card-content>
        
        <mat-card-actions>
          <button mat-button color="primary" routerLink="/purchases">
            Back to Purchases
          </button>
        </mat-card-actions>
      </mat-card>
    </div>
  `
})
export class PurchaseDetailComponent implements OnInit {
  purchase: Purchase | null = null;
  isVerifying = false;

  constructor(
    private route: ActivatedRoute,
    private purchaseService: PurchaseService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadPurchase(id);
    }
  }

  private loadPurchase(id: string): void {
    this.purchaseService.getPurchase(id).subscribe({
      next: (purchase) => {
        this.purchase = purchase;
      },
      error: (error) => {
        console.error('Failed to load purchase:', error);
        // TODO: Show error message to user
      }
    });
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'completed': return 'primary';
      case 'pending': return 'accent';
      case 'failed': return 'warn';
      default: return 'default';
    }
  }

  verifyPayment(): void {
    if (!this.purchase) return;

    this.isVerifying = true;
    this.purchaseService.verifyPayment(this.purchase.id).subscribe({
      next: (result) => {
        this.isVerifying = false;
        if (result.valid) {
          this.loadPurchase(this.purchase!.id);
        }
      },
      error: (error) => {
        this.isVerifying = false;
        console.error('Payment verification failed:', error);
        // TODO: Show error message to user
      }
    });
  }
}