import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { TransferRefPinDto } from './models/TransferRefPinDto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GabBoaService {
  private baseUrl = 'http://localhost:8080/api/v1/auth';
  constructor(private http: HttpClient, private toast: NgToastService) { 
  }

  searchTransferGab(transferRefPinDto : TransferRefPinDto): Observable<any>{
    return this.http.post(`${this.baseUrl}/showTransferGab`,transferRefPinDto);
  }
}
