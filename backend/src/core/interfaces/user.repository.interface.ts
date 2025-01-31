import { IRepository } from './repository.interface';
import { User } from '../models/user.model';

// Interface Segregation Principle: Specific interface for user operations
export interface IUserRepository extends IRepository<User> {
  findByEmail(email: string): Promise<User | null>;
  updateLastLogin(id: string): Promise<User | null>;
}