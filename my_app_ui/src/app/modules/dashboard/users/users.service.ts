import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';
import { UserDto } from '../../../models/UserDto';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUrl = 'http://localhost:8080/api/v1/auth';
  constructor(private http: HttpClient, private toast: NgToastService) {}


  getAllUsers():Observable<any>{
    return this.http.get(`${this.baseUrl}/getAllUsers`);
  }

  deleteUser(id:number):Observable<any>{
    return this.http.post(`${this.baseUrl}/deleteUser`, id);
  }

  searchUser(id:number):Observable<any>{
    return this.http.post(`${this.baseUrl}/searchUserByID`, id);
  }

  updateUserProperty(userDto: UserDto): Observable<any> {
    return this.http.patch(`${this.baseUrl}/updateUserInfo`, userDto);
  }

  addUser(userDto: UserDto): Observable<any> {
    return this.http.post(`${this.baseUrl}/addUserIntoDb`, userDto);
  }
}
