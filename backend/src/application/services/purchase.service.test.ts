import { PurchaseService } from './purchase.service';
import { IPurchaseRepository } from '../../core/interfaces/purchase.repository.interface';
import { IBookRepository } from '../../core/interfaces/book.repository.interface';
import { IPaymentGateway } from '../../core/interfaces/payment-gateway.interface';

describe('PurchaseService', () => {
  let purchaseService: PurchaseService;
  let purchaseRepository: jest.Mocked<IPurchaseRepository>;
  let bookRepository: jest.Mocked<IBookRepository>;
  let paymentGateway: jest.Mocked<IPaymentGateway>;

  beforeEach(() => {
    purchaseRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      findByUserId: jest.fn(),
      findByPaymentStatus: jest.fn(),
      updatePaymentStatus: jest.fn()
    } as any;

    bookRepository = {
      findById: jest.fn(),
      updateStock: jest.fn()
    } as any;

    paymentGateway = {
      processPayment: jest.fn(),
      verifyPayment: jest.fn()
    } as any;

    purchaseService = new PurchaseService(
      purchaseRepository,
      bookRepository,
      paymentGateway
    );
  });

  describe('createPurchase', () => {
    it('should create a purchase successfully', async () => {
      const userId = '1';
      const bookId = '1';
      const quantity = 1;

      const mockBook = {
        id: bookId,
        price: 29.99,
        stock: 5,
        available: true
      };

      const mockPayment = {
        success: true,
        transactionId: 'tx_123'
      };

      const mockPurchase = {
        id: '1',
        userId,
        bookId,
        quantity,
        totalAmount: 29.99,
        paymentStatus: 'completed'
      };

      bookRepository.findById.mockResolvedValue(mockBook as any);
      paymentGateway.processPayment.mockResolvedValue(mockPayment);
      purchaseRepository.create.mockResolvedValue(mockPurchase as any);
      bookRepository.updateStock.mockResolvedValue({ ...mockBook, stock: 4 } as any);

      const result = await purchaseService.createPurchase(userId, bookId, quantity);

      expect(result).toEqual(mockPurchase);
      expect(bookRepository.updateStock).toHaveBeenCalledWith(bookId, -quantity);
    });

    it('should throw error if book not found', async () => {
      bookRepository.findById.mockResolvedValue(null);

      await expect(purchaseService.createPurchase('1', '1', 1))
        .rejects
        .toThrow('Book not found');
    });

    it('should throw error if insufficient stock', async () => {
      const mockBook = {
        id: '1',
        stock: 0,
        available: false
      };

      bookRepository.findById.mockResolvedValue(mockBook as any);

      await expect(purchaseService.createPurchase('1', '1', 1))
        .rejects
        .toThrow('Insufficient stock');
    });
  });

  describe('verifyPayment', () => {
    it('should verify payment successfully', async () => {
      const purchaseId = '1';
      const mockPurchase = {
        id: purchaseId,
        paymentId: 'tx_123'
      };

      purchaseRepository.findById.mockResolvedValue(mockPurchase as any);
      paymentGateway.verifyPayment.mockResolvedValue(true);

      const result = await purchaseService.verifyPayment(purchaseId);

      expect(result).toBe(true);
    });

    it('should return false for invalid payment', async () => {
      const purchaseId = '1';
      const mockPurchase = {
        id: purchaseId,
        paymentId: 'tx_123'
      };

      purchaseRepository.findById.mockResolvedValue(mockPurchase as any);
      paymentGateway.verifyPayment.mockResolvedValue(false);

      const result = await purchaseService.verifyPayment(purchaseId);

      expect(result).toBe(false);
      expect(purchaseRepository.updatePaymentStatus)
        .toHaveBeenCalledWith(purchaseId, 'failed');
    });
  });
});