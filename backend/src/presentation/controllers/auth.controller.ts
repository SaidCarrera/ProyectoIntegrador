import { Request, Response } from 'express';
import { AuthService } from '../../application/services/auth.service';

// Single Responsibility Principle: Controller handles HTTP auth requests/responses
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  async register(req: Request, res: Response): Promise<void> {
    try {
      const { user, token } = await this.authService.register(req.body);
      res.status(201).json({ user, token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const { user, token } = await this.authService.login(email, password);
      res.json({ user, token });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }
}