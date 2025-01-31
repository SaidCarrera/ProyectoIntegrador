import { Injectable } from '@injectable-ts';
import { ReservationModel, Reservation } from '../../core/models/reservation.model';
import { IReservationRepository } from '../../core/interfaces/reservation.repository.interface';

// Dependency Inversion Principle: High-level modules depend on abstractions
@Injectable()
export class ReservationRepository implements IReservationRepository {
  async findById(id: string): Promise<Reservation | null> {
    return ReservationModel.findById(id)
      .populate('userId')
      .populate('bookId')
      .exec();
  }

  async findAll(): Promise<Reservation[]> {
    return ReservationModel.find()
      .populate('userId')
      .populate('bookId')
      .exec();
  }

  async create(data: Partial<Reservation>): Promise<Reservation> {
    return ReservationModel.create(data);
  }

  async update(id: string, data: Partial<Reservation>): Promise<Reservation | null> {
    return ReservationModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<boolean> {
    const result = await ReservationModel.findByIdAndDelete(id).exec();
    return !!result;
  }

  async findByUserId(userId: string): Promise<Reservation[]> {
    return ReservationModel.find({ userId })
      .populate('bookId')
      .exec();
  }

  async findActiveReservations(): Promise<Reservation[]> {
    return ReservationModel.find({
      status: { $in: ['pending', 'active'] }
    })
      .populate('userId')
      .populate('bookId')
      .exec();
  }

  async findOverdueReservations(): Promise<Reservation[]> {
    return ReservationModel.find({
      status: 'active',
      dueDate: { $lt: new Date() }
    })
      .populate('userId')
      .populate('bookId')
      .exec();
  }

  async updateStatus(id: string, status: Reservation['status']): Promise<Reservation | null> {
    return ReservationModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).exec();
  }
}