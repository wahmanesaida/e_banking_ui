import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../../models/User.model";
import {Transfert} from "../console-agent/servir-transfert/models/Transfert";
import {NgToastService} from "ng-angular-popup";
import {ReturnTransferDTO} from "../../models/ReturnTransferDTO.model";
import { MulticriteriaSearchDto } from '../../models/MulticriteriaSearchDto';
import { RenvoiDto } from '../../models/RenvoiDto';


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

  searchTransfertBackOffice(multicriteriaSearchDto:MulticriteriaSearchDto) :Observable<any>{
    return this.http.post(`${this.baseUrl}/searchCriteria`,multicriteriaSearchDto);
  }

  exportTransfersToExcel(transfers: Transfert[]): Observable<Blob> {
    return this.http.post(`${this.baseUrl}/exportFile`, transfers, { responseType: 'blob', headers: { 'Content-Type': 'application/json' } });
  }

  getAllTransfers():Observable<any>{
    return this.http.get(`${this.baseUrl}/transfers`);
  }

  renvoyerNotification(renvoiDto: RenvoiDto):Observable<any>{
    return this.http.post(`${this.baseUrl}/renvoiNotification`, renvoiDto);
  }

}
