import {Component, OnInit} from '@angular/core';
import {MatButton, MatButtonModule} from "@angular/material/button";
import {CommonModule, NgIf} from "@angular/common";
import {NgToastModule, NgToastService} from "ng-angular-popup";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {TransfertDto} from "../../../models/TransfertDto.model";
import {ConsoleAgentService} from "../../console-agent/console-agent.service";
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogTitle
} from "@angular/material/dialog";
import {AuthService} from "../../../auth/auth.service";
import {Beneficiary} from "../../console-agent/servir-transfert/models/Beneficiary";
import {User} from "../../../models/User.model";
import {TransferRequest} from "../../../models/TransferRequest.model";
import {
  DialogBeneficiaryComponent
} from "../../console-agent/par-debit-de-compte/dialog-beneficiary/dialog-beneficiary.component";
import {BeneficiaryDto} from "../../../models/BeneficiaryDto.model";
import {ConsoleAgentRoutingModule} from "../../console-agent/console-agent-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {BackOfficeRoutingModule} from "../back-office-routing.module";
import {BackOfficeService} from "../back-office.service";
import {Transfert} from "../../console-agent/servir-transfert/models/Transfert";
import {Motif} from "../../../models/Motif.enum";
import {ReturnTransferDTO} from "../../../models/ReturnTransferDTO.model";

@Component({
  selector: 'app-return-the-transfer',
  templateUrl: './return-the-transfer.component.html',
  styleUrl: './return-the-transfer.component.css'
})
export class ReturnTheTransferComponent implements OnInit{


  errorMessage: string;
  ReturnDone: boolean = false;




  title = 'angular13bestcode';

  personalDetails!: FormGroup;
  transferDetails!: FormGroup;
  recu!: FormGroup;
  personal_step = false;
  transfer_step = false;
  education_step = false;
  step = 1;
  validOtp: boolean;

  tt = "saida";
  private name: any;
  private animal: any;
  transferDto: TransfertDto;


  motifForm: FormGroup;
  motifs = Motif;

  constructor(private formBuilder: FormBuilder, private backOfficeService: BackOfficeService, private toastService: NgToastService, private dialog: MatDialog, private authService: AuthService) {

  }

  ngOnInit() {
    console.log("this is id of current agent  "+ Number(localStorage.getItem('id')))
    console.log("this is id   "+ Number(localStorage.getItem('id')))


    this.personalDetails = this.formBuilder.group({
      transferRefr: ['', Validators.required],
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


    console.log(this.personalDetails);

      this.motifForm = this.formBuilder.group({
        motifName: ['', Validators.required] // Form control for motifName
      });




  }

  get personal() {
    return this.personalDetails.controls;
  }


  get motiff() {
    return this.motifForm.controls;
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

            this.errorMessage='';
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
      this.personalDetails.get('Id_Agent').setValue(transfert.agent.id);
      this.personalDetails.get('AgentName').setValue(transfert.agent.name);
      this.personalDetails.get('AgentLastName').setValue(transfert.agent.username);
      this.personalDetails.get('DateEmission').setValue(transfert.createTime);
      this.personalDetails.get('Montant').setValue(transfert.amount_transfer);
      this.personalDetails.get('NameBene').setValue(transfert.beneficiary.lastname);
      this.personalDetails.get('Prénombene').setValue(transfert.beneficiary.firstName);
      this.personalDetails.updateValueAndValidity();
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
        id_agent: this.personalDetails.value.Id_Agent,
        notification: this.personalDetails.value.notification,
      }
      this.backOfficeService.ReturnTheTransfer(ReturnTransfer).subscribe(
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








  next() {
    if (this.step === 1) {

      if (this.personalDetails.valid) {
        this.personal_step = true;
        this.step++;

      }
    } else if (this.step === 2) {
      console.log('Transfer details form valid:', this.transferDetails.valid);

      if (this.transferDetails.valid) {
        this.transfer_step= true;
        this.step++;

      }
    }
  }





  submit() {
     this.submitForm();
     console.log(this.ReturnDone);
     this.toastService.info({
      detail : "Processing your request. Please wait...",
      summary: "...",
      duration: 5000,
      position: 'topCenter'

    });



    }

  download(){}


  protected readonly Object = Object;
}
