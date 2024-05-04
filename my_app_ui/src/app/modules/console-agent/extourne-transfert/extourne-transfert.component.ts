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

  transferDetails!: FormGroup;
  motifInfo!: FormGroup;
  Validation!: FormGroup;
  motif_step = false;
  transfer_step = false;
  validation_step = false;
  step = 1;

  transfer: TransferRequest;

  constructor(
    private formBuilder: FormBuilder,
    private transfer_service: ConsoleAgentService,
    private toast: NgToastService
  ) {}

  ngOnInit() {
    this.transferDetails = this.formBuilder.group({
      transferRef: [
        '',
        [Validators.required, Validators.pattern(/^837\d{10}$/)],
      ],
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
      motif: ['', Validators.required]
    });

    this.Validation = this.formBuilder.group({});
  }

  get transferD() {
    return this.transferDetails.controls;
  }

  get Motif() {
    return this.motifInfo.controls;
  }

  get validation() {
    return this.Validation.controls;
  }

  next() {
    if (this.step === 1) {
      if (this.transferDetails.valid) {
        this.transfer_step = true; //personal_step
        this.step++;
      }
    } else if (this.step === 2) {
      if (this.motifInfo.valid) {
        this.motif_step = true; // transfer_step
        this.step++;
      }
    }
  }

  previous() {
    this.step--;
    if (this.step == 1) {
      this.motif_step = false; //motif_step
    }
    if (this.step == 2) {
      this.validation_step = false;
    }
  }

  submit() {
    if (this.step == 3) {
      this.validation_step = true;
      if (this.Validation.invalid) {
        return;
      }
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
          this.transferType = transfert.typeOftransfer;
          this.emailBeneficiary = transfert.beneficiary.username;
          this.transferDetails.get('idAgent').setValue(transfert.agent.id);
          this.transferDetails.get('name').setValue(transfert.client.name);
          this.transferDetails.get('username').setValue(transfert.client.username);
          this.transferDetails.get('createTime').setValue(transfert.createTime);
          this.transferDetails.get('amount_transfer').setValue(transfert.amount_transfer);
          this.transferDetails.get('amountOfFees').setValue(transfert.amountOfFees);
          this.transferDetails.get('firstName').setValue(transfert.beneficiary.firstName);
          this.transferDetails.get('lastname').setValue(transfert.beneficiary.lastname);
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
    const transferPaymentDto: TransferPaymentDto = {
      transferRefDTO: {
        id: this.transferId,
        idAgent: this.transferDetails.get('idAgent').value,
        amount_transfer: this.transferDetails.get('amount_transfer').value,
        transferRef: this.transferDetails.get('transferRef').value,
        typeOftransfer: this.transferType,
        motif: motifValue,
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

  generateExtourneReceipt() {
    const transferPaymentDto: TransferPaymentDto = {
      transferRefDTO: {
        id: this.transferId,
        idAgent: this.transferDetails.get('idAgent').value,
        amount_transfer: this.transferDetails.get('amount_transfer').value,
        transferRef: this.transferDetails.get('transferRef').value,
        typeOftransfer: this.transferType,
      },
      beneficiaryDto: {},
    };
    this.transfer_service.generateExtourneReceipt(transferPaymentDto).subscribe(
      (response: Blob) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.href = url;
        a.download = 'recu_extourne.pdf';
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
