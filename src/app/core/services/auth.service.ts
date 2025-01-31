import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User, UserCredentials } from '../models/user.model';
import { environment } from '../../../environments/environment';

// Single Responsibility Principle: Service handles only authentication
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private tokenKey = 'auth_token';
  private userKey = 'user_data';
  private currentUserSubject = new BehaviorSubject<User | null>(this.getUserFromStorage());
  
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(credentials: UserCredentials): Observable<User> {
    return this.http.post<{ user: User; token: string }>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap(response => {
          localStorage.setItem(this.tokenKey, response.token);
          localStorage.setItem(this.userKey, JSON.stringify(response.user));
          this.currentUserSubject.next(response.user);
        })
      );
  }

  register(userData: UserCredentials & { name: string }): Observable<User> {
    return this.http.post<{ user: User; token: string }>(`${this.apiUrl}/register`, userData)
      .pipe(
        tap(response => {
          localStorage.setItem(this.tokenKey, response.token);
          localStorage.setItem(this.userKey, JSON.stringify(response.user));
          this.currentUserSubject.next(response.user);
        })
      );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  hasRole(role: string): boolean {
    const user = this.currentUserSubject.value;
    return user?.role === role;
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private getUserFromStorage(): User | null {
    const userData = localStorage.getItem(this.userKey);
    return userData ? JSON.parse(userData) : null;
  }
}