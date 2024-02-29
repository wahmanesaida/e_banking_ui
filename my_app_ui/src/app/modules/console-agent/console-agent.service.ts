import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../../models/User.model";
import {TransferRequest} from "../../models/TransferRequest.model";

@Injectable({
  providedIn: 'root'
})
export class ConsoleAgentService {

  private  baseUrl='http://localhost:8080/api/v1/auth'
  constructor(private http: HttpClient) { }

  getUserByPhone(phone: string): Observable<User> {
    const url = `${this.baseUrl}/showkyc/${phone}`;
    return this.http.get<User>(url);
  }

  makeTransferAgent(request: TransferRequest): Observable<any>{
    const id=request.id_user
    return this.http.post<any>(`${this.baseUrl}/transfert/${id}`, request);
  }

  sendOtp(email: string): Observable<any> {

    const body0 =email;
    return this.http.post<any>(`${this.baseUrl}/send-otp`, body0);
  }




  validateOtp(email: string, otp: string): Observable<any> {
    const body = { email, otp };
    return this.http.post<any>(`${this.baseUrl}/validate-otp`, body);
  }




}
