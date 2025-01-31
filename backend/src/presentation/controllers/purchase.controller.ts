import { Request, Response } from 'express';
import { PurchaseService } from '../../application/services/purchase.service';

// Single Responsibility Principle: Controller handles HTTP purchase requests/responses
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  async createPurchase(req: Request, res: Response): Promise<void> {
    try {
      const { bookId, quantity } = req.body;
      const userId = req.user.id;
      const purchase = await this.purchaseService.createPurchase(userId, bookId, quantity);
      res.status(201).json(purchase);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getUserPurchases(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user.id;
      const purchases = await this.purchaseService.getUserPurchases(userId);
      res.json(purchases);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async verifyPayment(req: Request, res: Response): Promise<void> {
    try {
      const { purchaseId } = req.params;
      const isValid = await this.purchaseService.verifyPayment(purchaseId);
      res.json({ valid: isValid });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}