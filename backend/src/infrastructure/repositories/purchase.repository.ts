import { Injectable } from '@injectable-ts';
import { PurchaseModel, Purchase } from '../../core/models/purchase.model';
import { IPurchaseRepository } from '../../core/interfaces/purchase.repository.interface';

// Dependency Inversion Principle: High-level modules depend on abstractions
@Injectable()
export class PurchaseRepository implements IPurchaseRepository {
  async findById(id: string): Promise<Purchase | null> {
    return PurchaseModel.findById(id)
      .populate('userId')
      .populate('bookId')
      .exec();
  }

  async findAll(): Promise<Purchase[]> {
    return PurchaseModel.find()
      .populate('userId')
      .populate('bookId')
      .exec();
  }

  async create(data: Partial<Purchase>): Promise<Purchase> {
    return PurchaseModel.create(data);
  }

  async update(id: string, data: Partial<Purchase>): Promise<Purchase | null> {
    return PurchaseModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<boolean> {
    const result = await PurchaseModel.findByIdAndDelete(id).exec();
    return !!result;
  }

  async findByUserId(userId: string): Promise<Purchase[]> {
    return PurchaseModel.find({ userId })
      .populate('bookId')
      .exec();
  }

  async findByPaymentStatus(status: Purchase['paymentStatus']): Promise<Purchase[]> {
    return PurchaseModel.find({ paymentStatus: status })
      .populate('userId')
      .populate('bookId')
      .exec();
  }

  async updatePaymentStatus(
    id: string,
    status: Purchase['paymentStatus'],
    paymentId?: string
  ): Promise<Purchase | null> {
    return PurchaseModel.findByIdAndUpdate(
      id,
      { paymentStatus: status, paymentId },
      { new: true }
    ).exec();
  }
}