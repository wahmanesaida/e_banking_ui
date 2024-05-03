import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  private baseUrl = 'http://localhost:8080/api/v1/auth';

  constructor(private http: HttpClient) { }

  getAlltransactions():Observable<any>{
    const url=`${this.baseUrl}/AllTransactions`;
    return this.http.get(url);
  }
}
