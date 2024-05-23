import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';
import { Beneficiary } from '../../console-agent/servir-transfert/models/Beneficiary';

@Injectable({
  providedIn: 'root'
})
export class BeneficiairesService {


  private baseUrl = 'http://localhost:8080/api/v1/auth';
  constructor(private http: HttpClient, private toast: NgToastService) {}


  getAllBeneficiaries(id:number):Observable<any>{
    return this.http.post(`${this.baseUrl}/getBeneficiariesHome`,id);
  }

  updateBeneficiaryProperty(beneDto: Beneficiary): Observable<any> {
    return this.http.patch(`${this.baseUrl}/updateBeneficiaryHome`, beneDto);
  }

  addBeneficiary(beneDto: Beneficiary): Observable<any> {
    return this.http.post(`${this.baseUrl}/addBeneficiaryHome`, beneDto);
  }

  deleteBeneficiary(id:number):Observable<any>{
    return this.http.post(`${this.baseUrl}/deleteBeneficiaryHome`,id);
  }

  
}
