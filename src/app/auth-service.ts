import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { map } from 'rxjs';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private SESSION_KEY: string = 'auth_user';
  private CREDENTIALS_KEY: string = 'auth_credentials';

  username: string = '';
  password: string = '';

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {}

  authenticate(username: string, password: string) {
    const headers = new HttpHeaders({
      authorization: 'Basic ' + window.btoa(username + ':' + password)
    });

    return this.http.get<any>('http://localhost:8383/auth', { headers })
      .pipe(map((user) => {
        this.username = username;
        this.password = password;

        if (isPlatformBrowser(this.platformId)) {
          sessionStorage.setItem(this.SESSION_KEY, JSON.stringify(user));
          sessionStorage.setItem(this.CREDENTIALS_KEY, window.btoa(username + ':' + password));
        }

        return user;
      }));
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.removeItem(this.SESSION_KEY);
      sessionStorage.removeItem(this.CREDENTIALS_KEY);
    }
    this.username = '';
    this.password = '';
  }

  isUserLoggedin(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return sessionStorage.getItem(this.SESSION_KEY) !== null;
    }
    return false;
  }

  getLoggedinUser(): any {
    if (isPlatformBrowser(this.platformId)) {
      const user = sessionStorage.getItem(this.SESSION_KEY);
      return user ? JSON.parse(user) : null;
    }
    return null;
  }

  getAuthHeader(): HttpHeaders {
    if (isPlatformBrowser(this.platformId)) {
      const credentials = sessionStorage.getItem(this.CREDENTIALS_KEY);
      return new HttpHeaders({
        authorization: 'Basic ' + credentials
      });
    }
    return new HttpHeaders();
  }
}
