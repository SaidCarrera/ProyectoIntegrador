import { Schema, model } from 'mongoose';

// Single Responsibility Principle: Purchase model only handles purchase-related data
export interface Purchase {
  id: string;
  userId: string;
  bookId: string;
  quantity: number;
  totalAmount: number;
  paymentStatus: 'pending' | 'completed' | 'failed';
  paymentId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const purchaseSchema = new Schema<Purchase>({
  userId: { type: String, required: true, ref: 'User' },
  bookId: { type: String, required: true, ref: 'Book' },
  quantity: { type: Number, required: true, min: 1 },
  totalAmount: { type: Number, required: true },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  paymentId: { type: String },
}, {
  timestamps: true
});

export const PurchaseModel = model<Purchase>('Purchase', purchaseSchema);