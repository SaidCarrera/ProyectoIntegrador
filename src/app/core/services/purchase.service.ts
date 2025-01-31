import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Purchase } from '../models/purchase.model';
import { environment } from '../../../environments/environment';

// Single Responsibility Principle: Service handles only purchase-related operations
@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  private apiUrl = `${environment.apiUrl}/purchases`;

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {}

  createPurchase(bookId: string, quantity: number): Observable<Purchase> {
    return this.http.post<Purchase>(this.apiUrl, { bookId, quantity }).pipe(
      catchError(error => {
        this.showError('Failed to create purchase: ' + (error.error?.message || 'Unknown error'));
        return throwError(() => error);
      })
    );
  }

  getUserPurchases(): Observable<Purchase[]> {
    return this.http.get<Purchase[]>(`${this.apiUrl}/user`).pipe(
      catchError(error => {
        this.showError('Failed to fetch purchases: ' + (error.error?.message || 'Unknown error'));
        return throwError(() => error);
      })
    );
  }

  getPurchase(id: string): Observable<Purchase> {
    return this.http.get<Purchase>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        this.showError('Failed to fetch purchase details: ' + (error.error?.message || 'Unknown error'));
        return throwError(() => error);
      })
    );
  }

  verifyPayment(purchaseId: string): Observable<{ valid: boolean }> {
    return this.http.get<{ valid: boolean }>(`${this.apiUrl}/${purchaseId}/verify`).pipe(
      catchError(error => {
        this.showError('Payment verification failed: ' + (error.error?.message || 'Unknown error'));
        return throwError(() => error);
      })
    );
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['error-snackbar']
    });
  }
}