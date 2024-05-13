import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TransfertDto} from "../../../models/TransfertDto.model";
import {Motif} from "../../../models/Motif.enum";
import {BackOfficeService} from "../../back-office/back-office.service";
import {NgToastService} from "ng-angular-popup";
import {MatDialog} from "@angular/material/dialog";
import {AuthService} from "../../../auth/auth.service";
import {Transfert} from "../../console-agent/servir-transfert/models/Transfert";
import {ReturnTransferDTO} from "../../../models/ReturnTransferDTO.model";
import {ConsoleAgentService} from "../../console-agent/console-agent.service";
import {map, Observable} from "rxjs";
import {ReturnTheTransferByClientService} from "./return-the-transfer-by-client.service";
import {TransferPaymentDto} from "../../console-agent/servir-transfert/models/TransferPaymentDto";
import {TypeOftransfer} from "../../../models/TypeOftransfer.enum";
import {Router} from "@angular/router";

@Component({
  selector: 'app-return-the-transfer-by-client',
  templateUrl: './return-the-transfer-by-client.component.html',
  styleUrl: './return-the-transfer-by-client.component.css'
})
export class ReturnTheTransferByClientComponent implements OnInit{

  errorMessage: string;
  ReturnDone: boolean = false;




  title = 'angular13bestcode';

  personalDetails!: FormGroup;
  transferDetails!: FormGroup;
  Otp!: FormGroup;
  recu!: FormGroup;
  personal_step = false;
  transfer_step = false;
  education_step = false;
  step = 1;
  otpSent: boolean=false;
  otpValidated: boolean=false;
  referenceSelected: string;
  transertSelected: Transfert;
  transferts$: Observable<Transfert []>;
  refs: boolean=false;
  ser: boolean=false;
  transferId: number;
  transferType: TypeOftransfer;
  clientId : number;



  motifForm: FormGroup;
  motifs = Motif;

  constructor(private formBuilder: FormBuilder, private backOfficeService: BackOfficeService, private toastService: NgToastService, private dialog: MatDialog, private transfer_service: ConsoleAgentService, private returnTransferService : ReturnTheTransferByClientService, private router: Router) {

  }

  ngOnInit() {
    console.log("this is id of current agent  "+ Number(localStorage.getItem('id')))
    console.log("this is id   "+ Number(localStorage.getItem('id')))


    this.personalDetails = this.formBuilder.group({
      transferRefr: [''],
      referenceSelected: [''],
      Id_Agent: ['', Validators.required],
      AgentName: ['', Validators.required],
      AgentLastName: ['', Validators.required],
      DateEmission: ['', Validators.required],
      Montant: ['', Validators.required],
      NameBene: ['', Validators.required],
      Prénombene: ['', Validators.required],
      motifName: ['', Validators.required],
      notification: ['', Validators.required],

    });

    this.Otp = this.formBuilder.group({
      otp: ['', Validators.required]
    });



    console.log(this.personalDetails);

    this.motifForm = this.formBuilder.group({
      motifName: ['', Validators.required] // Form control for motifName
    });

    this.transferts$=this.returnTransferService.getAllTransfersOfAClient(Number(localStorage.getItem("id")));


  }

  get personal() {
    return this.personalDetails.controls;
  }


  get motiff() {
    return this.motifForm.controls;
  }

  get otp() {
    return this.Otp.controls;
  }

  formatMotifKey(key: string): string {
    return key.replace(/_/g, ' ');
  }



  searchTransfertByReference(){
    const refernce=this.personal['transferRefr'].value;
    console.log("this is the reference"+ refernce);
    if(refernce){
      this.backOfficeService.GetTranserByReference(refernce).subscribe(
        (transfert: Transfert) => {
          if(transfert != null){
            console.log(transfert);
            this.patchFormWithTransferData(transfert);
            this.toastService.info({ detail: "SUCCES", summary: "le transfert est trouvé avec succée", duration: 5000, position: 'topRight' });
            this.ser=true;
            this.transferId=transfert.id;
            this.errorMessage='';
            this.clientId=transfert.client.id;
           console.log("vérifier le référence"+this.personalDetails.value.transferRefr);
          }else{
            this.patchFormWithTransferData(transfert);
            this.errorMessage= "Identifiant invalide, il n'y a aucun transfert avec cet identifiant !! ";
            this.toastService.error({ detail: "Pay Attention", summary: this.errorMessage, duration: 5000, position: 'topCenter' });

          }
        }
      )

    }
  }

  patchFormWithTransferData(transfert: Transfert){
    if(transfert != null){
      //this.personalDetails.get('title').setValue(user.title);
      this.personalDetails.get('Id_Agent').setValue(transfert.client.id);
      this.personalDetails.get('AgentName').setValue(transfert.client.name);
      this.personalDetails.get('AgentLastName').setValue(transfert.client.username);
      this.personalDetails.get('DateEmission').setValue(transfert.createTime);
      this.personalDetails.get('Montant').setValue(transfert.amount_transfer);
      this.personalDetails.get('NameBene').setValue(transfert.beneficiary.lastname);
      this.personalDetails.get('Prénombene').setValue(transfert.beneficiary.firstName);
      this.personalDetails.updateValueAndValidity();
      console.log("client connecté: " + Number(localStorage.getItem('id')));
      console.log("client associé au transfert: " + this.clientId);
    }
    else {
      this.personalDetails.get('Id_Agent').setValue('');
      this.personalDetails.get('AgentName').setValue('');
      this.personalDetails.get('AgentLastName').setValue('');
      this.personalDetails.get('DateEmission').setValue('');
      this.personalDetails.get('Montant').setValue('');
      this.personalDetails.get('NameBene').setValue('');
      this.personalDetails.get('Prénombene').setValue('');
      this.personalDetails.updateValueAndValidity();

    }
  }


  submitForm(){
    if(this.personalDetails.valid){
      const ReturnTransfer : ReturnTransferDTO={
        transferRef: this.personalDetails.value.transferRefr,
        motif: this.personalDetails.value.motifName,
        id_agent: null,
        notification: this.personalDetails.value.notification,
        client_id: Number(localStorage.getItem('id')),


      }

      this.returnTransferService.ReturnTheTransferByClient(ReturnTransfer).subscribe(
        (response) => {
          this.toastService.info({ detail: "Transfer Message", summary: response.message, duration: 5000, position: 'topRight' });
          if(response.message == "transfert réstitué avec succé"){
            this.ReturnDone=true;
            this.toastService.info({ detail: "Transfer Message", summary: response.message, duration: 5000, position: 'topRight' });
          }else{
            this.toastService.error({ detail: "error Message", summary: response.message, duration: 5000, position: 'topRight' });
          }
        },
        (error)=>{
          this.toastService.error({ detail: "error Message", summary: error.message, duration: 5000, position: 'topRight' });
        }
      );
    }

  }


  onSelectedTransfert(event: Event){
    const selectElement = event.target as HTMLSelectElement
    console.log("référence du transfert: "+selectElement.value)
    console.log("vérifier le référence"+this.personalDetails.value.transferRefr);
    this.refs=true;
    this.personalDetails.get('transferRefr').setValue(selectElement.value);
    console.log("jjjjjjjjjn   "+this.personalDetails.value.transferRefr);
    this.transferts$.pipe(
      map((transferts: Transfert[]) => transferts.find(transfert => Number(transfert.transferRef) === +selectElement.value))
    ).subscribe((selectedTransfert: Transfert) => {
      if (selectedTransfert !== undefined) {
        this.clientId=selectedTransfert.client.id;
        this.transferId=selectedTransfert.id;
        this.patchFormWithTransferData(selectedTransfert);
        console.log(selectedTransfert);
      }

  })
  }

  sendOtp(){
    console.log(this.personalDetails.value.AgentLastName);

    this.transfer_service.sendOtp(this.personalDetails.value.AgentLastName).subscribe(
      (data :string)=>{
        this.otpSent = true;
        this.toastService.success({
          detail : "Success",
          summary: "Otp send successfuly",
          duration: 5000,
          position: 'topRight'

        })

      },
      (error)=>{
        this.otpSent = false;
      }
    );
  }


  validateOtp() {
    const otp = this.Otp.get('otp').value;
    this.transfer_service.validateOtp(this.personalDetails.value.AgentLastName, otp).subscribe(
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


  generateReturnReceipt() {
    const transferPaymentDto: TransferPaymentDto = {
      transferRefDTO: {
        id: this.transferId,
        idAgent: this.personalDetails.get('Id_Agent').value,
        amount_transfer: this.personalDetails.get('Montant').value,
        transferRef: this.personalDetails.get('transferRefr').value,
        typeOftransfer: this.transferType,
      },
      beneficiaryDto: {},
    };
    this.returnTransferService.generateReturnReceipt(transferPaymentDto).subscribe(
      (response: Blob) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.href = url;
        a.download = 'Reçu_Restitution.pdf';
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      },
      (error: any) => {
        console.log(error);
        this.toastService.error({
          detail: 'Pay Attention',
          summary: error.error,
          duration: 5000,
          position: 'topCenter',
        });
      }
    );
  }





  next() {
    if (this.step === 1) {

      if (this.personalDetails.valid) {
        this.personal_step = true;
        this.step++;

      }
    } else if (this.step === 2) {
      this.step++;

      if (this.Otp.valid) {
        this.transfer_step= true;
        this.step++;

      }
    }
  }

  previous() {
    this.step--
    if (this.step == 1) {
      this.transfer_step = false;
    }
    if (this.step == 2) {
      this.education_step = false;
    }
  }





  submit() {
    console.log(this.step);
    if(this.step == 2){
      if(this.otpValidated == false) {
        this.toastService.error({
          detail: "Error",
          summary: "you should validate the Otp before making the transfer !",
          duration: 5000,
          position: 'topRight'

        })
        return;
      }

      if(this.otpSent == false){
        this.toastService.error({
          detail: "Error",
          summary: "you should send and validate the Otp before making the transfer !",
          duration: 5000,
          position: 'topRight'

        });
        return;

      }

      this.submitForm();
      console.log(this.ReturnDone);
      this.toastService.info({
        detail : "Processing your request. Please wait...",
        summary: "...",
        duration: 5000,
        position: 'topCenter'

      });
    }
    this.step++;




  }

  download(){}


  protected readonly Object = Object;

  goToHome() {
    this.router.navigateByUrl('/Home/home');// Navigate to the home page
  }

}
