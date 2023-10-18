import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs';

import { environment } from '@environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = environment.API_URL
  constructor(
    private http: HttpClient
  ) { }

  login(email: string, password: string) {
    return this.http.post(`${this.apiUrl}/api/v1/auth/login`, {
      email,
      password
    })
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
    return this.http.post(`${this.apiUrl}/api/v1/auth/recovery`, { token, newPassword })
  }

}
