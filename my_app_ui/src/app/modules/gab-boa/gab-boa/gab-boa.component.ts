import { Component, OnInit } from '@angular/core';
import { TypeOftransfer } from '../../../models/TypeOftransfer.enum';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransferRequest } from '../../../models/TransferRequest.model';
import { NgToastService } from 'ng-angular-popup';
import { Transfert } from '../../console-agent/servir-transfert/models/Transfert';
import { GabBoaService } from '../gab-boa.service';
import { TransferRefPinDto } from '../models/TransferRefPinDto';
import { TransferPaymentDto } from '../../console-agent/servir-transfert/models/TransferPaymentDto';

@Component({
  selector: 'app-gab-boa',
  templateUrl: './gab-boa.component.html',
  styleUrl: './gab-boa.component.css'
})
export class GabBoaComponent implements OnInit {

  beneficiaryId: number;
  transferId: number;
  transferType: TypeOftransfer;
  emailBeneficiary: string;
  transferPaid: boolean = false;
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
    private Gab_service: GabBoaService,
    private toast: NgToastService
  ) {}

  ngOnInit() {
    this.transferDetails = this.formBuilder.group({
      transferRef: ['',[Validators.required, Validators.pattern(/^837\d{10}$/)]],
      pin: ['', Validators.required],
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

    this.Validation = this.formBuilder.group({
    });
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
        this.motif_step = true;// transfer_step
        this.step++;
      }
    }
  }

  previous() {
    this.step--;
    if (this.step == 1) {
      this.motif_step = false;//motif_step
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
      const transferDto: TransferRefPinDto = {
        transferRef: this.transferDetails.get('transferRef').value,
        codepin :this.transferDetails.get('pin').value
      };
      this.Gab_service.searchTransferGab(transferDto).subscribe(
        (transfert: Transfert) => {
          this.beneficiaryId = transfert.beneficiary.id;
          this.transferId = transfert.id;
          this.transferType = transfert.typeOftransfer;
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

  validatePaymentGab(){
    const transferPaymentDto: TransferPaymentDto = {
      transferRefDTO: {
        id: this.transferId,
        idAgent: this.transferDetails.get('idAgent').value,
        amount_transfer: this.transferDetails.get('amount_transfer').value,
        transferRef: this.transferDetails.get('transferRef').value,
        typeOftransfer: this.transferType
      },
      beneficiaryDto: {},
    };

    this.Gab_service.validatePaymentGab(transferPaymentDto).subscribe(
      (response: any) => {
        this.toast.success({
          detail: 'Congrats',
          summary: 'le transfert est payé en succés',
          duration: 5000,
          position: 'topCenter',
        });
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


   submitAndValidate() {
    this.submit();
    this.validatePaymentGab();
  }



  generateReceiptGab() {
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
    this.Gab_service.generateReceiptGab(transferPaymentDto).subscribe(
      (response: Blob) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.href = url;
        a.download = 'recu_payé.pdf';
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
