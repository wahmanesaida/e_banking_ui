import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransferRequest } from '../../../models/TransferRequest.model';
import { ConsoleAgentService } from '../console-agent.service';
import { TransferRefDTO } from './models/TransferRefDTO';
import { Transfert } from './models/Transfert';
import { TransferPaymentDto } from './models/TransferPaymentDto';
import { TypeOftransfer } from '../../../models/TypeOftransfer.enum';
import { NgToastService } from 'ng-angular-popup';
import { BeneficiaryDto } from './models/BeneficiaryDto';

@Component({
  selector: 'app-servir-transfert',
  templateUrl: './servir-transfert.component.html',
  styleUrl: './servir-transfert.component.css',
})
export class ServirTransfertComponent implements OnInit {
  beneficiaryId: number;
  transferId: number;
  transferType: TypeOftransfer;
  walletSelected: boolean = false;
  emailBeneficiary: string;
  transferPaid:boolean = false;


  errorMessage:string;
  transferDone: boolean = false;
  otpValidated: boolean = false;
  otpSent: boolean = false;

  transferDetails!: FormGroup;
  beneficiaryDetails!: FormGroup;
  Otp!: FormGroup;
  personal_step = false;
  transfer_step = false;
  education_step = false;
  step = 1;

  transfer: TransferRequest;

  constructor(
    private formBuilder: FormBuilder,
    private transfer_service: ConsoleAgentService,
    private toast: NgToastService
  ) {}

  ngOnInit() {
    this.transferDetails = this.formBuilder.group({
      typetransfer: ['', Validators.required],
      transferRef: ['', [Validators.required, Validators.pattern(/^837\d{10}$/)]],
      idAgent: ['', Validators.required],
      name: ['', Validators.required],
      username: ['', Validators.required],
      createTime: ['', Validators.required],
      amount_transfer: ['', Validators.required],
      firstName: ['', Validators.required],
      lastname: ['', Validators.required],
    });
    
    this.beneficiaryDetails = this.formBuilder.group({
      title: ['', Validators.required],
      pieceIdentite: ['', Validators.required],
      paysEmission: ['', Validators.required],
      numeroPieceIdentite: ['', Validators.required],
      expirationPieceIdentite: ['', Validators.required],
      validitePieceIdentite: ['', Validators.required],
      datenaissance: ['', Validators.required],
      profession: ['', Validators.required],
      payeNationale: ['', Validators.required],
      ville: ['', Validators.required],
    });

    this.Otp = this.formBuilder.group({
      otp: ['',[Validators.required, Validators.pattern(/^\d{6}$/)]],
    });
  }

  get personal() {
    return this.transferDetails.controls;
  }

  get transferD() {
    return this.beneficiaryDetails.controls;
  }

  get otp() {
    return this.Otp.controls;
  }

  next() {
    if (this.step === 1) {
      if (this.transferDetails.valid) {
        this.personal_step = true;
        this.step++;
      }
    } else if (this.step === 2) {
      if (this.beneficiaryDetails.valid) {
        this.transfer_step = true;
        this.step++;
      }
    }
  }

  previous() {
    this.step--;
    if (this.step == 1) {
      this.transfer_step = false;
    }
    if (this.step == 2) {
      this.education_step = false;
    }
  }

 

  submit() {
    if (this.step == 3) {
      this.education_step = true;
      if (this.Otp.invalid) {
        return;
      }
    }
  }

  sendOtp() {
    this.transfer_service.sendOtp(this.emailBeneficiary).subscribe(
      (data: string) => {
        this.otpSent = true;
      },
      (error) => {
        this.otpSent = false;
      }
    );
  }

  validateOtp() {
    const otp = this.Otp.get('otp').value;
    this.transfer_service.validateOtp(this.emailBeneficiary, otp).subscribe(
      (response: any) => {
        this.errorMessage = response.message;
        if (response.message === 'OTP is valid') {
          this.otpValidated = true;
        }
      },
      (error) => {
        this.errorMessage = error.error;
        console.log(this.errorMessage);
        this.otpValidated = false;
      }
    );
  }

  searchTransfer() {
    try {
      const transferDto: TransferRefDTO = {
        transferRef: this.transferDetails.get('transferRef').value,
      };
      this.transfer_service.searchTransfer(transferDto).subscribe(
        (transfert: Transfert) => {
          this.beneficiaryId = transfert.beneficiary.id;
          this.transferId = transfert.id;
          this.transferType = transfert.type_transfer;
          this.emailBeneficiary = transfert.beneficiary.username;
          this.transferDetails.get('idAgent').setValue(transfert.agent.id); 
          this.transferDetails.get('name').setValue(transfert.client.name);
          this.transferDetails.get('username').setValue(transfert.client.username);
          this.transferDetails.get('createTime').setValue(transfert.createTime);
          this.transferDetails.get('amount_transfer').setValue(transfert.amount_transfer);
          this.transferDetails.get('firstName').setValue(transfert.beneficiary.firstName);
          this.transferDetails.get('lastname').setValue(transfert.beneficiary.lastname);

            const existingBeneficiaryDto: BeneficiaryDto = {
              title: transfert.beneficiary.title,
              pieceIdentite: transfert.beneficiary.pieceIdentite,
              paysEmission: transfert.beneficiary.paysEmission,
              numeroPieceIdentite: transfert.beneficiary.numeroPieceIdentite,
              expirationPieceIdentite: transfert.beneficiary.expirationPieceIdentite,
              validitePieceIdentite: transfert.beneficiary.validitePieceIdentite,
              datenaissance: transfert.beneficiary.datenaissance,
              profession: transfert.beneficiary.profession,
              payeNationale: transfert.beneficiary.payeNationale,
              ville: transfert.beneficiary.ville,
            };
            this.updateBeneficiaryInfo(existingBeneficiaryDto);
        },
        (error) => {
          this.toast.error({
            detail: 'Pay Attention',
            summary: error.error,
            duration: 5000,
            position: 'topCenter',
          });
        }
      );
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }

  validatePayment() {
    const transferPaymentDto: TransferPaymentDto = {
      transferRefDTO: {
        id: this.transferId,
        idAgent: this.transferDetails.get('idAgent').value,
        amount_transfer: this.transferDetails.get('amount_transfer').value,
        transferRef: this.transferDetails.get('transferRef').value,
        typeOftransfer: this.transferType,
      },
      beneficiaryDto: {
        id: this.beneficiaryId,
        title: this.beneficiaryDetails.get('title').value,
        pieceIdentite: this.beneficiaryDetails.get('pieceIdentite').value,
        paysEmission: this.beneficiaryDetails.get('paysEmission').value,
        numeroPieceIdentite: this.beneficiaryDetails.get('numeroPieceIdentite')
          .value,
        expirationPieceIdentite: this.beneficiaryDetails.get(
          'expirationPieceIdentite'
        ).value,
        validitePieceIdentite: this.beneficiaryDetails.get(
          'validitePieceIdentite'
        ).value,
        datenaissance: this.beneficiaryDetails.get('datenaissance').value,
        profession: this.beneficiaryDetails.get('profession').value,
        payeNationale: this.beneficiaryDetails.get('payeNationale').value,
        ville: this.beneficiaryDetails.get('ville').value,
      },
    };

    this.transfer_service.validatePayment(transferPaymentDto).subscribe(
      (response: any) => {
        this.toast.success({ detail: "Congrats", summary: 'Payment validated', duration: 5000, position: 'topCenter' });
        this.transferPaid = true;
      },
      (error: any) => {
        console.log(error);
        this.toast.error({
          detail: 'Pay Attention',
          summary: error.error,
          duration: 5000,
          position: 'topCenter',
        });
      }
    );

  }


  updateBeneficiaryInfo(beneficiaryDto: BeneficiaryDto): void {
    this.beneficiaryDetails.patchValue({
      title: beneficiaryDto.title,
      pieceIdentite: beneficiaryDto.pieceIdentite,
      paysEmission: beneficiaryDto.paysEmission,
      numeroPieceIdentite: beneficiaryDto.numeroPieceIdentite,
      expirationPieceIdentite: beneficiaryDto.expirationPieceIdentite,
      validitePieceIdentite: beneficiaryDto.validitePieceIdentite,
      datenaissance: beneficiaryDto.datenaissance,
      profession: beneficiaryDto.profession,
      payeNationale: beneficiaryDto.payeNationale,
      ville: beneficiaryDto.ville,
    });
  }

  generatePaymentReceipt() {
    const transferPaymentDto: TransferPaymentDto = {
      transferRefDTO: {
        id: this.transferId,
        idAgent: this.transferDetails.get('idAgent').value,
        amount_transfer: this.transferDetails.get('amount_transfer').value,
        transferRef: this.transferDetails.get('transferRef').value,
        typeOftransfer: this.transferType,
      },
      beneficiaryDto: {
        id: this.beneficiaryId,
        title: this.beneficiaryDetails.get('title').value,
        pieceIdentite: this.beneficiaryDetails.get('pieceIdentite').value,
        paysEmission: this.beneficiaryDetails.get('paysEmission').value,
        numeroPieceIdentite: this.beneficiaryDetails.get('numeroPieceIdentite')
          .value,
        expirationPieceIdentite: this.beneficiaryDetails.get(
          'expirationPieceIdentite'
        ).value,
        validitePieceIdentite: this.beneficiaryDetails.get(
          'validitePieceIdentite'
        ).value,
        datenaissance: this.beneficiaryDetails.get('datenaissance').value,
        profession: this.beneficiaryDetails.get('profession').value,
        payeNationale: this.beneficiaryDetails.get('payeNationale').value,
        ville: this.beneficiaryDetails.get('ville').value,
      },
    };
    this.transfer_service.generatePaymentReceipt(transferPaymentDto).subscribe(
      (response: Blob) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.href = url;
        a.download = 'payment_receipt.pdf';
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      },
      (error: any) => {
        console.log(error);
        this.toast.error({
          detail: 'Pay Attention',
          summary: error.error,
          duration: 5000,
          position: 'topCenter',
        });
      }
    );
  }

  onTransferTypeChange() {
    const transferType = this.transferDetails.get('typetransfer').value;
    this.walletSelected = transferType === 'WALLET';
  }
  
}
