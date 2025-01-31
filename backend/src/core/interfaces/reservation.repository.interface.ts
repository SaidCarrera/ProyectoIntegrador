import { IRepository } from './repository.interface';
import { Reservation } from '../models/reservation.model';

// Interface Segregation Principle: Specific interface for reservation operations
export interface IReservationRepository extends IRepository<Reservation> {
  findByUserId(userId: string): Promise<Reservation[]>;
  findActiveReservations(): Promise<Reservation[]>;
  findOverdueReservations(): Promise<Reservation[]>;
  updateStatus(id: string, status: Reservation['status']): Promise<Reservation | null>;
}