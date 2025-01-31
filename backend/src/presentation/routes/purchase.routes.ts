import { Router } from 'express';
import { PurchaseController } from '../controllers/purchase.controller';
import { PurchaseService } from '../../application/services/purchase.service';
import { PurchaseRepository } from '../../infrastructure/repositories/purchase.repository';
import { BookRepository } from '../../infrastructure/repositories/book.repository';
import { MockPaymentGateway } from '../../core/interfaces/payment-gateway.interface';
import { authMiddleware } from '../../middleware/auth.middleware';

const router = Router();
const purchaseRepository = new PurchaseRepository();
const bookRepository = new BookRepository();
const paymentGateway = new MockPaymentGateway();
const purchaseService = new PurchaseService(purchaseRepository, bookRepository, paymentGateway);
const purchaseController = new PurchaseController(purchaseService);

// Protected routes
router.use(authMiddleware);

// Purchase routes
router.post('/', (req, res) => purchaseController.createPurchase(req, res));
router.get('/user', (req, res) => purchaseController.getUserPurchases(req, res));
router.get('/:purchaseId/verify', (req, res) => purchaseController.verifyPayment(req, res));

export const purchaseRoutes = router;