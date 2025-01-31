import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { ReservationService } from '../../../core/services/reservation.service';
import { Reservation } from '../../../core/models/reservation.model';

@Component({
  selector: 'app-reservation-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatChipsModule],
  template: `
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-6">My Reservations</h1>
      
      <table mat-table [dataSource]="reservations" class="w-full">
        <ng-container matColumnDef="book">
          <th mat-header-cell *matHeaderCellDef>Book</th>
          <td mat-cell *matCellDef="let reservation">
            {{reservation.book?.title}}
          </td>
        </ng-container>

        <ng-container matColumnDef="startDate">
          <th mat-header-cell *matHeaderCellDef>Start Date</th>
          <td mat-cell *matCellDef="let reservation">
            {{reservation.startDate | date}}
          </td>
        </ng-container>

        <ng-container matColumnDef="dueDate">
          <th mat-header-cell *matHeaderCellDef>Due Date</th>
          <td mat-cell *matCellDef="let reservation">
            {{reservation.dueDate | date}}
          </td>
        </ng-container>

        <ng-container matColumnDef="status">
          <th mat-header-cell *matHeaderCellDef>Status</th>
          <td mat-cell *matCellDef="let reservation">
            <mat-chip [color]="getStatusColor(reservation.status)" selected>
              {{reservation.status}}
            </mat-chip>
          </td>
        </ng-container>

        <ng-container matColumnDef="actions">
          <th mat-header-cell *matHeaderCellDef>Actions</th>
          <td mat-cell *matCellDef="let reservation">
            <button mat-button color="primary" 
                    [routerLink]="['/reservations', reservation.id]">
              View Details
            </button>
            <button mat-button color="accent"
                    *ngIf="reservation.status === 'active'"
                    (click)="returnBook(reservation.id)">
              Return Book
            </button>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>
    </div>
  `
})
export class ReservationListComponent implements OnInit {
  reservations: Reservation[] = [];
  displayedColumns = ['book', 'startDate', 'dueDate', 'status', 'actions'];

  constructor(private reservationService: ReservationService) {}

  ngOnInit(): void {
    this.loadReservations();
  }

  private loadReservations(): void {
    this.reservationService.getUserReservations().subscribe(reservations => {
      this.reservations = reservations;
    });
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'active': return 'primary';
      case 'overdue': return 'warn';
      case 'returned': return 'accent';
      default: return 'default';
    }
  }

  returnBook(reservationId: string): void {
    this.reservationService.returnBook(reservationId).subscribe(() => {
      this.loadReservations();
    });
  }
}