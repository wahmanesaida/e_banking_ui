import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ReturnTransferDTO} from "../../../models/ReturnTransferDTO.model";
import {Observable} from "rxjs";
import {List} from "postcss/lib/list";
import {Transfert} from "../../console-agent/servir-transfert/models/Transfert";
import {TransferPaymentDto} from "../../console-agent/servir-transfert/models/TransferPaymentDto";

@Injectable({
  providedIn: 'root'
})
export class ReturnTheTransferByClientService {

  private  baseUrl='http://localhost:8080/api/v1/auth'

  constructor(private http: HttpClient) { }

  getAllTransfersOfAClient(clientId : number):Observable<any>{
    const url =`${this.baseUrl}/AllTheTTransersOfAClient/${clientId}`;
    return this.http.get(url);

  }

  ReturnTheTransferByClient(request: ReturnTransferDTO):Observable<any>{
    const url= `${this.baseUrl}/restoreTheTransferByClient`;
    return this.http.post<any>(url, request);
  }

  generateReturnReceipt(transferPaymentDto: TransferPaymentDto): Observable<Blob> {
    return this.http.post(
      `${this.baseUrl}/generateReturnReceipt`,
      transferPaymentDto,
      { responseType: 'blob' }
    );
  }
}
