import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {Observable, catchError, of, throwError} from "rxjs";
import {User} from "../../models/User.model";
import {TransferRequest} from "../../models/TransferRequest.model";
import { NgToastService } from 'ng-angular-popup';
import { TransfertDto } from '../../models/TransfertDto.model';
import { CheckAmountRequest } from '../../models/CheckAmountRequest';

@Injectable({
  providedIn: 'root'
})
export class ConsoleAgentService {

  private  baseUrl='http://localhost:8080/api/v1/auth'
  constructor(private http: HttpClient, private toast: NgToastService) { }

  getUserByPhone(phone: string): Observable<User> {
    const url = `${this.baseUrl}/showkyc/${phone}`;
    return this.http.get<User>(url);
  }

  makeTransferAgent(request: TransferRequest): Observable<any>{
    const id=request.id_user
    return this.http.post<any>(`${this.baseUrl}/transfert/${id}`, request);
  }

  sendOtp(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/send-otp`, email).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 400 && error.error === 'OTP already sent for this email') {
          this.toast.error({ detail: 'OTP already sent for this email', summary: 'Already Sent', duration: 5000, position: 'topCenter' });
        }
        return throwError(error); // re-throw the error so it can be handled elsewhere
      })
    );
  }

  validateOtp(email: string, otp: string): Observable<any> {
    const body = { email, otp };
    return this.http.post(`${this.baseUrl}/validate-otp`, body);
  }

  checkAmountOfTransfert(checkAmountRequest: CheckAmountRequest): Observable<any>{
    return this.http.post(`${this.baseUrl}/check-amount`,checkAmountRequest);
  }




}
