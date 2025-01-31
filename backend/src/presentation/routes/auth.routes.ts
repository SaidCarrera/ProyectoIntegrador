import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../../application/services/auth.service';
import { UserRepository } from '../../infrastructure/repositories/user.repository';

const router = Router();
const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

router.post('/register', (req, res) => authController.register(req, res));
router.post('/login', (req, res) => authController.login(req, res));

export const authRoutes = router;