export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  createdAt: Date;
}

export interface UserCredentials {
  email: string;
  password: string;
}