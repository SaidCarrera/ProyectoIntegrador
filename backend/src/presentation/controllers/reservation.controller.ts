import { Request, Response } from 'express';
import { ReservationService } from '../../application/services/reservation.service';

// Single Responsibility Principle: Controller handles HTTP reservation requests/responses
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  async createReservation(req: Request, res: Response): Promise<void> {
    try {
      const { bookId } = req.body;
      const userId = req.user.id;
      const reservation = await this.reservationService.createReservation(userId, bookId);
      res.status(201).json(reservation);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async returnBook(req: Request, res: Response): Promise<void> {
    try {
      const { reservationId } = req.params;
      const reservation = await this.reservationService.returnBook(reservationId);
      res.json(reservation);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getUserReservations(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user.id;
      const reservations = await this.reservationService.getUserReservations(userId);
      res.json(reservations);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}