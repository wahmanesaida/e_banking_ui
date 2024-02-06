import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASE_URL = ['http://localhost:8080/'];

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  signup(signupRequest: any): Observable<any> {
    return this.http.post(BASE_URL + 'api/v1/auth/register', signupRequest); //we should add the url of the api in the backend
  }

  login(loginRequest: any): Observable<any> {
    return this.http.post(BASE_URL + 'api/v1/auth/authenticate', loginRequest); //we should add the url of the api in the backend
  }

  hello(): Observable<any> {
    return this.http.get(BASE_URL + 'api/hello', {
      headers: this.createAuthorizationHeader()
    }); //we should add the url of the api in the backend
  }

  private createAuthorizationHeader(){
    const jwtToken = localStorage.getItem('JWT');
    if (jwtToken) {
      return new HttpHeaders().set(
        'Authorization', 'Bearer ' + jwtToken
      )
    }else{
      console.log('JWT token not found in the local Storage');
      
    }
    return null;
  }
}
