import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { ReservationService } from '../../../core/services/reservation.service';
import { Reservation } from '../../../core/models/reservation.model';

@Component({
  selector: 'app-reservation-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatChipsModule, MatButtonModule],
  template: `
    <div class="container mx-auto p-4">
      <mat-card *ngIf="reservation">
        <mat-card-header>
          <mat-card-title>Reservation Details</mat-card-title>
        </mat-card-header>
        
        <mat-card-content class="p-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <h3 class="font-bold">Book</h3>
              <p>{{reservation.book?.title}}</p>
            </div>
            
            <div>
              <h3 class="font-bold">Status</h3>
              <mat-chip [color]="getStatusColor(reservation.status)" selected>
                {{reservation.status}}
              </mat-chip>
            </div>
            
            <div>
              <h3 class="font-bold">Start Date</h3>
              <p>{{reservation.startDate | date}}</p>
            </div>
            
            <div>
              <h3 class="font-bold">Due Date</h3>
              <p>{{reservation.dueDate | date}}</p>
            </div>
            
            <div *ngIf="reservation.returnDate">
              <h3 class="font-bold">Return Date</h3>
              <p>{{reservation.returnDate | date}}</p>
            </div>
            
            <div *ngIf="reservation.fine">
              <h3 class="font-bold">Fine</h3>
              <p class="text-red-600">${{reservation.fine}}</p>
            </div>
          </div>
        </mat-card-content>
        
        <mat-card-actions>
          <button mat-button color="primary" routerLink="/reservations">
            Back to List
          </button>
          <button mat-raised-button color="accent"
                  *ngIf="reservation.status === 'active'"
                  (click)="returnBook()">
            Return Book
          </button>
        </mat-card-actions>
      </mat-card>
    </div>
  `
})
export class ReservationDetailComponent implements OnInit {
  reservation: Reservation | null = null;

  constructor(
    private route: ActivatedRoute,
    private reservationService: ReservationService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadReservation(id);
    }
  }

  private loadReservation(id: string): void {
    this.reservationService.getReservation(id).subscribe(reservation => {
      this.reservation = reservation;
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

  returnBook(): void {
    if (this.reservation) {
      this.reservationService.returnBook(this.reservation.id).subscribe(() => {
        this.loadReservation(this.reservation!.id);
      });
    }
  }
}