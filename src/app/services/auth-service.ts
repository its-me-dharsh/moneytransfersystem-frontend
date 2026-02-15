import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  private TOKEN_KEY: string = 'auth_token';
  private USER_KEY: string = 'auth_user';

  constructor(private http: HttpClient) {}

  // Authenticate user and store JWT
  authenticate(username: string, password: string) {
    return this.http.post<any>('http://localhost:8383/auth/login', { username, password })
      .pipe(map((response) => {
        // Expecting { token: "...", user: {...} }
        const token = response.token;
        const user = response.user;

        sessionStorage.setItem(this.TOKEN_KEY, token);
        sessionStorage.setItem(this.USER_KEY, JSON.stringify(user));

        return user;
      }));
  }

  // Logout clears session
  logout() {
    sessionStorage.removeItem(this.TOKEN_KEY);
    sessionStorage.removeItem(this.USER_KEY);
  }

  // Check if user is logged in
  isUserLoggedin(): boolean {
    return sessionStorage.getItem(this.TOKEN_KEY) !== null;
  }

  // Get logged-in user object
  getLoggedinUser(): any {
    const user = sessionStorage.getItem(this.USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  // Get JWT header for secured requests
  getAuthHeader(): HttpHeaders {
    const token = sessionStorage.getItem(this.TOKEN_KEY);
    return new HttpHeaders({
      Authorization: 'Bearer ' + token
    });
  }
}
