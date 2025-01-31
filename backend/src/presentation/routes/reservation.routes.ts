import { Router } from 'express';
import { ReservationController } from '../controllers/reservation.controller';
import { ReservationService } from '../../application/services/reservation.service';
import { ReservationRepository } from '../../infrastructure/repositories/reservation.repository';
import { BookRepository } from '../../infrastructure/repositories/book.repository';
import { authMiddleware, requireRole } from '../../middleware/auth.middleware';

const router = Router();
const reservationRepository = new ReservationRepository();
const bookRepository = new BookRepository();
const reservationService = new ReservationService(reservationRepository, bookRepository);
const reservationController = new ReservationController(reservationService);

// Protected routes
router.use(authMiddleware);

// User routes
router.post('/', (req, res) => reservationController.createReservation(req, res));
router.post('/:reservationId/return', (req, res) => reservationController.returnBook(req, res));
router.get('/user', (req, res) => reservationController.getUserReservations(req, res));

// Admin routes
router.get('/', requireRole(['admin']), (req, res) => reservationController.getAllReservations(req, res));

export const reservationRoutes = router;