import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NgToastService} from "ng-angular-popup";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MWalletService {

  private  baseUrl='http://localhost:8080/api/v1/auth'
  constructor(private http: HttpClient, private toast: NgToastService) { }

  getBenficiariesByClientId(ClientId: number): Observable<any>{
    return this.http.get(`${this.baseUrl}/listOfBenfficiaries/${ClientId}`);
  }
}
