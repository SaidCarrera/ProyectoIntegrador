import { Schema, model } from 'mongoose';

// Single Responsibility Principle: User model only handles user-related data
export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'user';
  lastLogin: Date;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<User>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  lastLogin: { type: Date },
}, {
  timestamps: true
});

export const UserModel = model<User>('User', userSchema);