import { Injectable } from '@injectable-ts';
import { IUserRepository } from '../../core/interfaces/user.repository.interface';
import { User } from '../../core/models/user.model';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

// Single Responsibility Principle: Service handles authentication logic
@Injectable()
export class AuthService {
  constructor(private readonly userRepository: IUserRepository) {}

  async register(userData: Partial<User>): Promise<{ user: User; token: string }> {
    const existingUser = await this.userRepository.findByEmail(userData.email!);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(userData.password!, 10);
    const user = await this.userRepository.create({
      ...userData,
      password: hashedPassword,
    });

    const token = this.generateToken(user);
    return { user, token };
  }

  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }

    await this.userRepository.updateLastLogin(user.id);
    const token = this.generateToken(user);
    return { user, token };
  }

  private generateToken(user: User): string {
    return jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );
  }
}