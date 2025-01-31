import { IRepository } from './repository.interface';
import { Purchase } from '../models/purchase.model';

// Interface Segregation Principle: Specific interface for purchase operations
export interface IPurchaseRepository extends IRepository<Purchase> {
  findByUserId(userId: string): Promise<Purchase[]>;
  findByPaymentStatus(status: Purchase['paymentStatus']): Promise<Purchase[]>;
  updatePaymentStatus(id: string, status: Purchase['paymentStatus'], paymentId?: string): Promise<Purchase | null>;
}