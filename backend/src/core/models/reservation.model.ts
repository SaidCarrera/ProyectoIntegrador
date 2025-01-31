import { Schema, model } from 'mongoose';

// Single Responsibility Principle: Reservation model only handles reservation data
export interface Reservation {
  id: string;
  userId: string;
  bookId: string;
  status: 'pending' | 'active' | 'returned' | 'overdue';
  startDate: Date;
  dueDate: Date;
  returnDate?: Date;
  fine?: number;
  createdAt: Date;
  updatedAt: Date;
}

const reservationSchema = new Schema<Reservation>({
  userId: { type: String, required: true, ref: 'User' },
  bookId: { type: String, required: true, ref: 'Book' },
  status: {
    type: String,
    enum: ['pending', 'active', 'returned', 'overdue'],
    default: 'pending'
  },
  startDate: { type: Date, required: true },
  dueDate: { type: Date, required: true },
  returnDate: { type: Date },
  fine: { type: Number, default: 0 },
}, {
  timestamps: true
});

export const ReservationModel = model<Reservation>('Reservation', reservationSchema);