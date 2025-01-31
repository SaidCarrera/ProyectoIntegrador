import { Injectable } from '@injectable-ts';
import { IReservationRepository } from '../../core/interfaces/reservation.repository.interface';
import { IBookRepository } from '../../core/interfaces/book.repository.interface';
import { Reservation } from '../../core/models/reservation.model';
import { IFineStrategy, StandardFineStrategy, HighDemandFineStrategy } from '../../core/interfaces/fine-strategy.interface';

// Single Responsibility Principle: Service handles reservation business logic
@Injectable()
export class ReservationService {
  private readonly standardFineStrategy: IFineStrategy;
  private readonly highDemandFineStrategy: IFineStrategy;

  constructor(
    private readonly reservationRepository: IReservationRepository,
    private readonly bookRepository: IBookRepository
  ) {
    this.standardFineStrategy = new StandardFineStrategy();
    this.highDemandFineStrategy = new HighDemandFineStrategy();
  }

  async createReservation(userId: string, bookId: string): Promise<Reservation> {
    const book = await this.bookRepository.findById(bookId);
    if (!book) {
      throw new Error('Book not found');
    }
    if (!book.available || book.stock < 1) {
      throw new Error('Book is not available');
    }

    const startDate = new Date();
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14); // 2 weeks reservation period

    const reservation = await this.reservationRepository.create({
      userId,
      bookId,
      startDate,
      dueDate,
      status: 'active'
    });

    await this.bookRepository.updateStock(bookId, -1);
    return reservation;
  }

  async returnBook(reservationId: string): Promise<Reservation> {
    const reservation = await this.reservationRepository.findById(reservationId);
    if (!reservation) {
      throw new Error('Reservation not found');
    }

    const book = await this.bookRepository.findById(reservation.bookId);
    if (!book) {
      throw new Error('Book not found');
    }

    const returnDate = new Date();
    const daysOverdue = Math.max(0, Math.floor(
      (returnDate.getTime() - reservation.dueDate.getTime()) / (1000 * 60 * 60 * 24)
    ));

    let fine = 0;
    if (daysOverdue > 0) {
      const strategy = book.stock < 5 ? this.highDemandFineStrategy : this.standardFineStrategy;
      fine = strategy.calculateFine(daysOverdue, book.price);
    }

    const updatedReservation = await this.reservationRepository.update(reservationId, {
      status: 'returned',
      returnDate,
      fine
    });

    await this.bookRepository.updateStock(reservation.bookId, 1);
    return updatedReservation!;
  }

  async checkOverdueReservations(): Promise<void> {
    const overdueReservations = await this.reservationRepository.findOverdueReservations();
    for (const reservation of overdueReservations) {
      await this.reservationRepository.updateStatus(reservation.id, 'overdue');
    }
  }

  async getUserReservations(userId: string): Promise<Reservation[]> {
    return this.reservationRepository.findByUserId(userId);
  }
}