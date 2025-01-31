import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PurchaseService } from './purchase.service';
import { environment } from '../../../environments/environment';

describe('PurchaseService', () => {
  let service: PurchaseService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule],
      providers: [PurchaseService]
    });
    service = TestBed.inject(PurchaseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create a purchase', () => {
    const mockPurchase = {
      id: '1',
      bookId: '1',
      quantity: 1,
      totalAmount: 29.99,
      paymentStatus: 'completed'
    };

    service.createPurchase('1', 1).subscribe(purchase => {
      expect(purchase).toEqual(mockPurchase);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/purchases`);
    expect(req.request.method).toBe('POST');
    req.flush(mockPurchase);
  });

  it('should get user purchases', () => {
    const mockPurchases = [
      { id: '1', bookId: '1', quantity: 1, totalAmount: 29.99 },
      { id: '2', bookId: '2', quantity: 2, totalAmount: 59.98 }
    ];

    service.getUserPurchases().subscribe(purchases => {
      expect(purchases).toEqual(mockPurchases);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/purchases/user`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPurchases);
  });

  it('should verify payment', () => {
    const mockResponse = { valid: true };

    service.verifyPayment('1').subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/purchases/1/verify`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should handle errors', () => {
    service.getUserPurchases().subscribe({
      error: error => {
        expect(error.error.message).toBe('Network error');
      }
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/purchases/user`);
    req.error(new ErrorEvent('Network error'), {
      status: 404,
      statusText: 'Not Found'
    });
  });
});