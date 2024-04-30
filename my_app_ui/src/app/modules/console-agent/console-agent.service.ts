import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Observable, catchError, of, throwError } from 'rxjs';
import { User } from '../../models/User.model';
import { TransferRequest } from '../../models/TransferRequest.model';
import { NgToastService } from 'ng-angular-popup';
import { TransfertDto } from '../../models/TransfertDto.model';
import { CheckAmountRequest } from '../../models/CheckAmountRequest';
import { BeneficiaryDto } from '../../models/BeneficiaryDto.model';
import { TransferRefDTO } from './servir-transfert/models/TransferRefDTO';
import { TransferPaymentDto } from './servir-transfert/models/TransferPaymentDto';
import { Beneficiary } from './servir-transfert/models/Beneficiary';
import { MulticriteriaSearchDto } from '../../models/MulticriteriaSearchDto';
import { Transfert } from './servir-transfert/models/Transfert';
import { MailStructure } from '../../models/MailStructure';
import { RenvoiDto } from '../../models/RenvoiDto';

@Injectable({
  providedIn: 'root',
})
export class ConsoleAgentService {
  private baseUrl = 'http://localhost:8080/api/v1/auth';
  constructor(private http: HttpClient, private toast: NgToastService) {}

  getUserByPhone(phone: string): Observable<User> {
    const url = `${this.baseUrl}/showkyc/${phone}`;
    return this.http.get<User>(url);
  }

  makeTransferAgent(request: TransferRequest): Observable<any> {
    const id = request.id_user;
    return this.http.post<any>(`${this.baseUrl}/transfert/${id}`, request);
  }

  sendOtp(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/send-otp`, email).pipe(
      catchError((error: HttpErrorResponse) => {
        if (
          error.status === 400 &&
          error.error === 'OTP already sent for this email'
        ) {
          this.toast.error({
            detail: 'OTP already sent for this email',
            summary: 'Already Sent',
            duration: 5000,
            position: 'topCenter',
          });
        }
        return throwError(error); // re-throw the error so it can be handled elsewhere
      })
    );
  }

  validateOtp(email: string, otp: string): Observable<any> {
    const body = { email, otp };
    return this.http.post(`${this.baseUrl}/validate-otp`, body);
  }

  selectBeneficiary(id_beneficiary: number): Observable<any> {
    return this.http.get<Beneficiary>(
      `${this.baseUrl}/selectbene/${id_beneficiary}`
    );
  }

  AddBeneficiary(
    beneficiaryDto: BeneficiaryDto,
    id_user: number
  ): Observable<any> {
    const bodyy: { beneficiaryDto: BeneficiaryDto; id_user: number } = {
      beneficiaryDto,
      id_user,
    };
    return this.http.post(`${this.baseUrl}/addnew_beneficiary`, bodyy);
  }

  searchTransfer(transferRefDTO: TransferRefDTO): Observable<any> {
    return this.http.post(`${this.baseUrl}/showTransfer`, transferRefDTO);
  }

  validatePayment(transferPaymentDto: TransferPaymentDto): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/validateTransfer`,
      transferPaymentDto
    );
  }

  generatePaymentReceipt(
    transferPaymentDto: TransferPaymentDto
  ): Observable<Blob> {
    return this.http.post(
      `${this.baseUrl}/generatePaymentReciept`,
      transferPaymentDto,
      { responseType: 'blob' }
    );
  }
  reverseTransfer(transferPaymentDto: TransferPaymentDto): Observable<any> {
    /* const loggedInUserId = Number(localStorage.getItem('id')); */
    /* if (transferPaymentDto.transferRefDTO.idAgent !== loggedInUserId) {
      this.toast.error({
        detail: 'The transfer is not initiated by the same agent',
        summary: 'Ouups',
        duration: 5000,
        position: 'topCenter',
      });
    } */
    return this.http.post(
      `${this.baseUrl}/reverseTransfer`,
      transferPaymentDto
    );
  }

  generateExtourneReceipt(transferPaymentDto: TransferPaymentDto): Observable<Blob> {
    return this.http.post(
      `${this.baseUrl}/generateExtourneReceipt`,
      transferPaymentDto,
      { responseType: 'blob' }
    );
  }

  getClientBynum(numeroPieceIdentite: string): Observable<any> {
    const body: { numeroPieceIdentite: string } = { numeroPieceIdentite };
    return this.http.post(`${this.baseUrl}/showKycBynumeroPieceIdentite`, body);
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
