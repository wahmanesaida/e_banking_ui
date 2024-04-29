import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, map, Observable} from 'rxjs';
import { jwtDecode } from 'jwt-decode'
import {User} from "../models/User.model";
import { NgToastService } from 'ng-angular-popup';

const BASE_URL = ['http://localhost:8080/'];

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public currentUser: Observable<User>;
  private currentUserSubject: BehaviorSubject<User>;
  constructor(private http: HttpClient) {
    let storageUser;
    const storageUserAsStr = localStorage.getItem('currentUser');
    if(storageUserAsStr){
      storageUser=JSON.parse(storageUserAsStr);
    }
    this.currentUserSubject=new BehaviorSubject<User>(storageUser);
    this.currentUser=this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User{
    return this.currentUserSubject.value;
  }

  signup(signupRequest: any): Observable<any> {
    return this.http.post(BASE_URL + 'api/v1/auth/register', signupRequest); //we should add the url of the api in the backend
  }

 login(loginRequest: any): Observable<any> {
    return this.http.post(BASE_URL + 'api/v1/auth/authenticate', loginRequest); //we should add the url of the api in the backend
 }

 loginError(loginRequest: any): Observable<any>{
  return this.http.post(BASE_URL+'api/v1/auth/login', loginRequest);

 }

 checkCredentialsExist(loginRequest: any): Observable<any>{
  return this.http.post(BASE_URL+'api/v1/auth/checkCredentialsExist', loginRequest);
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

  getCurrentUserId(): any {
    const jwtToken=localStorage.getItem('JWT');
    const decodeToken: any=jwtDecode(jwtToken)
    if(jwtToken){
      return  decodeToken;
    }else{
      return null;
    }

  }
}
