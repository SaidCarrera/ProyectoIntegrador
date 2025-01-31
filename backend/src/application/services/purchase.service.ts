import { Injectable } from '@injectable-ts';
import { IPurchaseRepository } from '../../core/interfaces/purchase.repository.interface';
import { IBookRepository } from '../../core/interfaces/book.repository.interface';
import { IPaymentGateway, PaymentDetails } from '../../core/interfaces/payment-gateway.interface';
import { Purchase } from '../../core/models/purchase.model';

// Single Responsibility Principle: Service handles purchase business logic
@Injectable()
export class PurchaseService {
  constructor(
    private readonly purchaseRepository: IPurchaseRepository,
    private readonly bookRepository: IBookRepository,
    private readonly paymentGateway: IPaymentGateway
  ) {}

  async createPurchase(
    userId: string,
    bookId: string,
    quantity: number
  ): Promise<Purchase> {
    const book = await this.bookRepository.findById(bookId);
    if (!book) {
      throw new Error('Book not found');
    }
    if (!book.available || book.stock < quantity) {
      throw new Error('Insufficient stock');
    }

    const totalAmount = book.price * quantity;
    const paymentDetails: PaymentDetails = {
      amount: totalAmount,
      currency: 'USD',
      description: `Purchase of ${quantity} copies of ${book.title}`
    };

    const paymentResult = await this.paymentGateway.processPayment(paymentDetails);
    if (!paymentResult.success) {
      throw new Error(paymentResult.error || 'Payment failed');
    }

    const purchase = await this.purchaseRepository.create({
      userId,
      bookId,
      quantity,
      totalAmount,
      paymentStatus: 'completed',
      paymentId: paymentResult.transactionId
    });

    await this.bookRepository.updateStock(bookId, -quantity);
    return purchase;
  }

  async getUserPurchases(userId: string): Promise<Purchase[]> {
    return this.purchaseRepository.findByUserId(userId);
  }

  async verifyPayment(purchaseId: string): Promise<boolean> {
    const purchase = await this.purchaseRepository.findById(purchaseId);
    if (!purchase || !purchase.paymentId) {
      return false;
    }

    const isValid = await this.paymentGateway.verifyPayment(purchase.paymentId);
    if (!isValid) {
      await this.purchaseRepository.updatePaymentStatus(purchaseId, 'failed');
      return false;
    }

    return true;
  }
}