import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AUTH_API_URL } from '../app-injection-tokens';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

export const ACCESS_TOKEN_KEY='access_token'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor(private http: HttpClient, @Inject(AUTH_API_URL) private apiUrl: string,
  private jwtHelper: JwtHelperService, private router: Router) {}

  login(username: string, password: string): Observable<Token> {
    let myheaders = new HttpHeaders();
    myheaders.set("Content-Type", "application/json");
    const body = { username: username, password: password };
    return this.http.post<Token>(this.apiUrl+"api/auth/login", body, { headers: myheaders }).pipe(
      tap(token => {
        // @ts-ignore 
        localStorage.setItem(ACCESS_TOKEN_KEY, token.access_token);
        //console.log(token.access_token);
      })
    );
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    return token && !this.jwtHelper.isTokenExpired(token);
  }

  logout(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    this.router.navigate(['']);
  }
}
