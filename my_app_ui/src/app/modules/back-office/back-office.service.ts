import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../../models/User.model";
import {Transfert} from "../console-agent/servir-transfert/models/Transfert";
import {NgToastService} from "ng-angular-popup";
import {ReturnTransferDTO} from "../../models/ReturnTransferDTO.model";


@Injectable({
  providedIn: 'root'
})
export class BackOfficeService {

  private baseUrl = 'http://localhost:8080/api/v1/auth';
  constructor(private http: HttpClient) { }

  GetTranserByReference(reference: string):Observable<Transfert>{
    const url=`${this.baseUrl}/GetTransactionByRef/${reference}`;
    return this.http.get<Transfert>(url);
  }

  ReturnTheTransfer(request: ReturnTransferDTO):Observable<any>{
    const url= `${this.baseUrl}/ReturnTheTransfer`;
    return this.http.post<any>(url, request);
  }

}
