import { Component, OnInit } from '@angular/core';
import { TypeOftransfer } from '../../../models/TypeOftransfer.enum';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransferRequest } from '../../../models/TransferRequest.model';
import { ConsoleAgentService } from '../console-agent.service';
import { NgToastService } from 'ng-angular-popup';
import { TransferRefDTO } from '../servir-transfert/models/TransferRefDTO';
import { Transfert } from '../servir-transfert/models/Transfert';
import { TransferPaymentDto } from '../servir-transfert/models/TransferPaymentDto';

@Component({
  selector: 'app-extourne-transfert',
  templateUrl: './extourne-transfert.component.html',
  styleUrl: './extourne-transfert.component.css',
})
export class ExtourneTransfertComponent implements OnInit {
  beneficiaryId: number;
  transferId: number;
  transferType: TypeOftransfer;
  emailBeneficiary: string;
  transferReversed: boolean = false;

  errorMessage: string;
  transferDone: boolean = false;
  otpValidated: boolean = false;
  otpSent: boolean = false;

  transferDetails!: FormGroup;
  motifInfo!: FormGroup;
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
      transferRef: ['',[Validators.required, Validators.pattern(/^837\d{10}$/)]],
      idAgent: ['', Validators.required],
      name: ['', Validators.required],
      username: ['', Validators.required],
      createTime: ['', Validators.required],
      amount_transfer: ['', Validators.required],
      amountOfFees: ['', Validators.required],
      firstName: ['', Validators.required],
      lastname: ['', Validators.required],
    });

    this.motifInfo = this.formBuilder.group({
      motif: ['', Validators.required],
      otherMotif: [''],
    });

    this.Otp = this.formBuilder.group({
      otp: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
    });
  }

  get personal() {
    return this.transferDetails.controls;
  }

  get transferD() {
    return this.motifInfo.controls;
  }

  get otp() {
    return this.Otp.controls;
  }

  next() {
    if (this.step === 1) {
      console.log('Personal details form valid:', this.transferDetails.valid);
      if (this.transferDetails.valid) {
        this.personal_step = true;
        this.step++;
      }
    } else if (this.step === 2) {
      console.log('Beneficiary details form valid:', this.motifInfo.valid);

      if (this.motifInfo.valid) {
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
      //alert("Well done!!")
    }
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
          this.transferDetails
            .get('username')
            .setValue(transfert.client.username);
          this.transferDetails.get('createTime').setValue(transfert.createTime);
          this.transferDetails
            .get('amount_transfer')
            .setValue(transfert.amount_transfer);
          this.transferDetails
            .get('amountOfFees')
            .setValue(transfert.amountOfFees);
          this.transferDetails
            .get('firstName')
            .setValue(transfert.beneficiary.firstName);
          this.transferDetails
            .get('lastname')
            .setValue(transfert.beneficiary.lastname);
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

  reverseTransfer() {
    let motifValue = this.motifInfo.get('motif').value;
    if (motifValue === 'Autres') {
      motifValue = this.motifInfo.get('otherMotif').value;
    }
    const transferPaymentDto: TransferPaymentDto = {
      transferRefDTO: {
        id: this.transferId,
        idAgent: this.transferDetails.get('idAgent').value,
        amount_transfer: this.transferDetails.get('amount_transfer').value,
        transferRef: this.transferDetails.get('transferRef').value,
        typeOftransfer: this.transferType,
        motif: motifValue
      },
      beneficiaryDto: {},
    };

    this.transfer_service.reverseTransfer(transferPaymentDto).subscribe(
      (response: any) => {
        this.toast.success({
          detail: 'Congrats',
          summary: 'le transfert est extourné',
          duration: 5000,
          position: 'topCenter',
        });
        this.transferReversed = true;
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
        title: this.motifInfo.get('title').value,
        pieceIdentite: this.motifInfo.get('pieceIdentite').value,
        paysEmission: this.motifInfo.get('paysEmission').value,
        numeroPieceIdentite: this.motifInfo.get('numeroPieceIdentite').value,
        expirationPieceIdentite: this.motifInfo.get('expirationPieceIdentite')
          .value,
        validitePieceIdentite: this.motifInfo.get('validitePieceIdentite')
          .value,
        datenaissance: this.motifInfo.get('datenaissance').value,
        profession: this.motifInfo.get('profession').value,
        payeNationale: this.motifInfo.get('payeNationale').value,
        ville: this.motifInfo.get('ville').value,
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
}
