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