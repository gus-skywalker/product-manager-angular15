import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private credentials: { username: string; password: string } | null = null;

  setCredentials(username: string, password: string): void {
    this.credentials = { username, password };
  }

  clear(): void {
    this.credentials = null;
  }

  getAuthorizationHeader(): string | null {
    if (!this.credentials) return null;

    const token = btoa(`${this.credentials.username}:${this.credentials.password}`);
    return `Basic ${token}`;
  }

  isLoggedIn(): boolean {
    return !!this.credentials;
  }
}
