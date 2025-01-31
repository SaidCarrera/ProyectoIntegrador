import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { PurchaseService } from '../../../core/services/purchase.service';
import { Purchase } from '../../../core/models/purchase.model';

@Component({
  selector: 'app-purchase-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatChipsModule
  ],
  template: `
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-6">Purchase History</h1>
      
      <table mat-table [dataSource]="purchases" class="w-full">
        <ng-container matColumnDef="book">
          <th mat-header-cell *matHeaderCellDef>Book</th>
          <td mat-cell *matCellDef="let purchase">{{purchase.book?.title}}</td>
        </ng-container>

        <ng-container matColumnDef="quantity">
          <th mat-header-cell *matHeaderCellDef>Quantity</th>
          <td mat-cell *matCellDef="let purchase">{{purchase.quantity}}</td>
        </ng-container>

        <ng-container matColumnDef="totalAmount">
          <th mat-header-cell *matHeaderCellDef>Total Amount</th>
          <td mat-cell *matCellDef="let purchase">${{purchase.totalAmount}}</td>
        </ng-container>

        <ng-container matColumnDef="status">
          <th mat-header-cell *matHeaderCellDef>Status</th>
          <td mat-cell *matCellDef="let purchase">
            <mat-chip [color]="getStatusColor(purchase.paymentStatus)" selected>
              {{purchase.paymentStatus}}
            </mat-chip>
          </td>
        </ng-container>

        <ng-container matColumnDef="date">
          <th mat-header-cell *matHeaderCellDef>Date</th>
          <td mat-cell *matCellDef="let purchase">
            {{purchase.createdAt | date}}
          </td>
        </ng-container>

        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef>Actions</th>
          <td mat-cell *matCellDef="let purchase">
            <button mat-button color="primary" 
                    [routerLink]="['/purchases', purchase.id]">
              View Details
            </button>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>
    </div>
  `
})
export class PurchaseListComponent implements OnInit {
  purchases: Purchase[] = [];
  displayedColumns = ['book', 'quantity', 'totalAmount', 'status', 'date', 'actions'];

  constructor(private purchaseService: PurchaseService) {}

  ngOnInit(): void {
    this.loadPurchases();
  }

  private loadPurchases(): void {
    this.purchaseService.getUserPurchases().subscribe({
      next: (purchases) => {
        this.purchases = purchases;
      },
      error: (error) => {
        console.error('Failed to load purchases:', error);
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
}