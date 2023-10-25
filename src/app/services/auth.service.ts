import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, switchMap, tap } from 'rxjs';

import { environment } from '@environments/environment';
import { TokenService } from '@services/token.service'
import { ResponseLogin } from '@models/auth.model';
import { User } from '@models/user.model';
import { checkToken } from '@interceptors/token.interceptor';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = environment.API_URL
  user$ = new BehaviorSubject<User | null>(null)

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
  ) { }

  login(email: string, password: string) {
    return this.http.post<ResponseLogin>(`${this.apiUrl}/api/v1/auth/login`, {
      email,
      password
    })
    .pipe(
      tap(response => {
        this.tokenService.saveToken(response.access_token);
        this.tokenService.saveRefreshToken(response.refresh_token);
      })
    )
  }

  refreshToken(refreshToken: string) {
    return this.http.post<ResponseLogin>(`${this.apiUrl}/api/v1/auth/refresh-token`, {refreshToken})
    .pipe(
      tap(response => {
        this.tokenService.saveToken(response.access_token);
        this.tokenService.saveRefreshToken(response.refresh_token);
      })
    )
  }

  register(name: string, password: string, email: string) {
    return this.http.post(`${this.apiUrl}/api/v1/auth/register`, {
      name,
      email,
      password
    })
  }

  registerAndLogin(name: string, password: string, email: string) {
    return this.register(name, password, email)
    .pipe(
      switchMap(() => this.login(email, password))
    )
  }

  isAvailable(email: string) {
    return this.http.post<{isAvailable: boolean}>(`${this.apiUrl}/api/v1/auth/is-available`, {
      email
    })  
  }

  recovery(email: string) {
    return this.http.post(`${this.apiUrl}/api/v1/auth/recovery`, {
      email
    })  
  }

  changePaswword(token: string, newPassword: string) {
    return this.http.post(`${this.apiUrl}/api/v1/auth/change-password`, { token, newPassword })
  }

  logout() {
    this.tokenService.removetoken();
  }

  getProfile() {
    
    return this.http.get<User>(`${this.apiUrl}/api/v1/auth/profile`, { context: checkToken() }).pipe(
      tap(user => {
        this.user$.next(user)
      })
    ) 
  }

}
