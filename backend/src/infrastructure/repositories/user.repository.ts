import { Injectable } from '@injectable-ts';
import { UserModel, User } from '../../core/models/user.model';
import { IUserRepository } from '../../core/interfaces/user.repository.interface';

// Dependency Inversion Principle: Implements repository interface
@Injectable()
export class UserRepository implements IUserRepository {
  async findById(id: string): Promise<User | null> {
    return UserModel.findById(id).exec();
  }

  async findAll(): Promise<User[]> {
    return UserModel.find().exec();
  }

  async create(data: Partial<User>): Promise<User> {
    return UserModel.create(data);
  }

  async update(id: string, data: Partial<User>): Promise<User | null> {
    return UserModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<boolean> {
    const result = await UserModel.findByIdAndDelete(id).exec();
    return !!result;
  }

  async findByEmail(email: string): Promise<User | null> {
    return UserModel.findOne({ email }).exec();
  }

  async updateLastLogin(id: string): Promise<User | null> {
    return UserModel.findByIdAndUpdate(
      id,
      { lastLogin: new Date() },
      { new: true }
    ).exec();
  }
}