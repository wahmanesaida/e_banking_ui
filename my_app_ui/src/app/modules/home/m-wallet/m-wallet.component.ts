import {Component, OnInit, signal} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ConsoleAgentService} from "../../console-agent/console-agent.service";
import {NgToastService} from "ng-angular-popup";
import {MatDialog} from "@angular/material/dialog";
import {AuthService} from "../../../auth/auth.service";
import {Beneficiary} from "../../console-agent/servir-transfert/models/Beneficiary";
import {
  DialogBeneficiaryComponent
} from "../../console-agent/par-debit-de-compte/dialog-beneficiary/dialog-beneficiary.component";
import {BeneficiaryDto} from "../../../models/BeneficiaryDto.model";
import {map, Observable} from "rxjs";
import {MWalletService} from "./m-wallet.service";
import { pipe } from 'rxjs';
import {TransferRequest} from "../../../models/TransferRequest.model";
import {Router} from "@angular/router";


@Component({
  selector: 'app-m-wallet',
  templateUrl: './m-wallet.component.html',
  styleUrl: './m-wallet.component.css'
})
export class MWalletComponent implements OnInit{
  beneficiarylDetails!: FormGroup;
  transferDetails!: FormGroup;
  Otp!: FormGroup;
  step: number=1;
  errorMessage: string;
  beneficiaries$: Observable<Beneficiary[]>;
  selectedBeneficiary: Beneficiary;

  personal_step = false;
  transfer_step = false;
  education_step = false;

  transferDone: boolean = false;
  otpValidated: boolean = false;
  otpSent: boolean = false;
  errorPhone: string='';
  transferMessage: string;

  constructor(private formBuilder: FormBuilder, private transfer_service: ConsoleAgentService, private toastService: NgToastService, private dialog: MatDialog, private Mwallet_service: MWalletService, private router: Router) { }
  ngOnInit(): void {
    this.beneficiarylDetails = this.formBuilder.group({
      typetransfer: ['', Validators.required],
      usernameSelected: ['', Validators.required],
      idbene: ['', Validators.required],
      name: ['', Validators.required],
      first_name: ['', Validators.required],
      email: ['', Validators.required],

    });

    this.transferDetails=this.formBuilder.group({
      amount: ['', Validators.required],
      notification:  ['', Validators.required],
      //saida: ['', Validators.required],
      typeOffees: ['', Validators.required],
    });

    this.Otp = this.formBuilder.group({
      otp: ['', Validators.required]
    });
    console.log(Number(localStorage.getItem("id")));


    this.beneficiaries$=this.Mwallet_service.getBenficiariesByClientId(Number(localStorage.getItem("id")));
  }

  get beneficiary() {
    return this.beneficiarylDetails.controls;
  }
  get transferD(){
    return this.transferDetails.controls;
  }
  get otp(){
    return this.Otp.controls;
  }

  submit() {

    if (this.step == 3) {
      console.log("id client: ", Number(localStorage.getItem('id')));
      this.education_step = true;
      if (this.otpValidated == false) {
        this.toastService.error({
          detail: "Error",
          summary: "you should validate the Otp before making the transfer !",
          duration: 5000,
          position: 'topRight'

        })
        return;
      }
      if (this.otpSent == false) {
        this.toastService.error({
          detail: "Error",
          summary: "you should send and validate the Otp before making the transfer !",
          duration: 5000,
          position: 'topRight'

        });
        return;
      }
        this.makeTransfer();
        this.toastService.info({
          detail : "Processing your request. Please wait...",
          summary: "...",
          duration: 5000,
          position: 'topCenter'

        })

        if (this.Otp.invalid) {
          this.toastService.error({
            detail : "Error",
            summary: "an error occured in the last form !",
            duration: 5000,
            position: 'topCenter'

          })
          return
        }


    }
  }


  makeTransfer(): void {
    if (this.transferDetails.valid) {
      console.log(this.transferDetails.value.amount);
      console.log(this.transferDetails.value.notification);
      console.log(this.transferDetails.value.typeOffees);
      console.log(this.beneficiarylDetails.value.typetransfer)
      console.log(this.transferDetails.value.id);
      console.log(this.transferDetails.value.first_name);
      console.log(this.transferDetails.value.name);
      console.log(this.transferDetails.value.gsm);
      console.log(this.transferDetails.value.email);
      console.log("client id ", Number(localStorage.getItem('id')))
      const transferAgent: TransferRequest = {
        transfertDto: {
          amount_entred: this.transferDetails.value.amount,
          notification: this.transferDetails.value.notification,
          typeOftransfer: this.beneficiarylDetails.value.typetransfer,
          fees: this.transferDetails.value.typeOffees,
          typePieceIdentite: null,
          numeroPieceIdentite: null,
          id_agent: Number(localStorage.getItem('id'))

        },
        id_beneficiary: this.beneficiarylDetails.value.idbene,
        bene: {
          firstName: this.beneficiarylDetails.value.first_name,
          lastname: this.beneficiarylDetails.value.name,
          //GSM: this.transferDetails.value.gsm,
          username: this.beneficiarylDetails.value.email
        },
        id_user: Number(localStorage.getItem('id')) // New property
      };
      this.beneficiarylDetails.updateValueAndValidity();
      console.log("this is transer dto: " + transferAgent.transfertDto.typeOftransfer)

      // this.formdataservice.setFormData(transferAgent);

      this.transfer_service.makeTransferAgent(transferAgent).subscribe(
        (response) => {
          console.log('Transfer Message:', response);
          this.transferMessage=response.message.message;
          this.toastService.info({ detail: "Transfer Message", summary: response.message.message, duration: 5000, position: 'topRight' });

          if(response.message.message == "congratulations, your transaction has been successful with a good amount"){
            this.transferDone = true;

          }
          if (response.receiptPdf != null) {
            // Convertir la chaîne de caractères base64 en ArrayBuffer
            const binaryString = window.atob(response.receiptPdf);
            const binaryLen = binaryString.length;
            const bytes = new Uint8Array(binaryLen);
            for (let i = 0; i < binaryLen; i++) {
              bytes[i] = binaryString.charCodeAt(i);
            }

            // Créer un Blob à partir des octets
            const pdfBlob = new Blob([bytes], { type: 'application/pdf' });

            // Créer une URL pour le Blob PDF
            const pdfUrl = URL.createObjectURL(pdfBlob);

            // Vous pouvez maintenant utiliser pdfUrl pour afficher ou télécharger le PDF dans votre application
            // Par exemple, pour ouvrir le PDF dans une nouvelle fenêtre :
            window.open(pdfUrl, '_blank');
          }

        },
        (error) => {
          console.error('An error occurred:', error);
        }
      );
    }
  }





      searchBeneficiaryById(){
    console.log("the button is clicked !");
    const id=this.beneficiary['id'].value;
   // console.log(this.personal['id_donor'].value)
    console.log(id);
    if(id){
      this.transfer_service.selectBeneficiary(id).subscribe(
        (beneficiary: Beneficiary) => {
          if(beneficiary != null){
            this.PatchFormWithBeneData(beneficiary);
            this.toastService.info({ detail: "SUCCES", summary: "user found successfuly", duration: 5000, position: 'topCenter' });

            this.errorMessage='';
          } else {
            console.log(beneficiary);
            this.PatchFormWithBeneData(beneficiary);
            this.errorMessage= "Invalid ID , there is no beneficiary with this Id ! ";
            this.toastService.error({ detail: "Pay Attention", summary: this.errorMessage, duration: 5000, position: 'topCenter' });



          }

        }
      );
    }
  }

  PatchFormWithBeneData(beneficiary : Beneficiary){
    if(beneficiary != null) {
      this.beneficiarylDetails.get('idbene').setValue(beneficiary.id);
      this.beneficiarylDetails.get('name').setValue(beneficiary.lastname);
      this.beneficiarylDetails.get('first_name').setValue(beneficiary.firstName);
      this.beneficiarylDetails.get('email').setValue(beneficiary.username);
      this.beneficiarylDetails.updateValueAndValidity();

    }else{
      this.beneficiarylDetails.get('idbene').setValue('');
      this.beneficiarylDetails.get('name').setValue('');
      this.beneficiarylDetails.get('first_name').setValue('');
      this.beneficiarylDetails.get('email').setValue('');
      this.beneficiarylDetails.updateValueAndValidity();

    }

  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogBeneficiaryComponent, {
      data: { id_user: Number(localStorage.getItem('id')) }// Pass id_user if necessary
    });


    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const beneficiaryDto: BeneficiaryDto = {
          firstName: result.firstName,
          lastname: result.lastName,
          username: result.email,
          // Add other properties as needed
        };


        this.transfer_service.AddBeneficiary(beneficiaryDto, Number(localStorage.getItem('id'))).subscribe(
          (response: any) => {

            console.log('Beneficiary added successfully');
            this.toastService.success({
              detail : "Beneficiary added successfully with id : " + response.id,
              summary: "",
              duration: 7000,
              position: 'topRight'

            })
            this.beneficiaries$=this.Mwallet_service.getBenficiariesByClientId(Number(localStorage.getItem("id")));
          },
          (error) => {
            console.error('Error adding beneficiary:', error);
            this.toastService.success({
              detail : "Error adding beneficiary ",
              summary: "",
              duration: 5000,
              position: 'topRight'

            })

          }
        );
      }
    });
  }


  onSelectBeneficiary(event: Event) {
    const selectElement = event.target as HTMLSelectElement
    console.log("id du beneficaire: "+selectElement.value)
    this.beneficiaries$.pipe(
      map((beneficiaries: Beneficiary[]) => beneficiaries.find(beneficiary => beneficiary.id === +selectElement.value))
    ).subscribe((selectedBeneficiary: Beneficiary) => {
      if (selectedBeneficiary !== undefined) {
        this.updateFormControls(selectedBeneficiary);
        console.log(selectedBeneficiary);
      }
    });
  }

  updateFormControls(beneficiary: Beneficiary) {
    this.selectedBeneficiary = beneficiary;
    this.beneficiarylDetails.controls['idbene'].setValue(beneficiary.id);
    this.beneficiarylDetails.controls['name'].setValue(beneficiary.lastname);
    this.beneficiarylDetails.controls['first_name'].setValue(beneficiary.firstName);
    this.beneficiarylDetails.controls['email'].setValue(beneficiary.username);
    this.beneficiarylDetails.controls['email'].setValue(beneficiary.username);
    // ... other fields
  }

  next() {
    if (this.step === 1) {
      console.log('Beneficiary details form valid:', this.beneficiarylDetails.valid);
      console.log("id client: ", Number(localStorage.getItem('id')));
      console.log(this.beneficiarylDetails.value.typetransfer)
      if (this.beneficiarylDetails.valid) {
        this.personal_step = true;
        this.step++;
      }else {
        this.toastService.error({
          detail : "vous devez remplir tous les champs! ",
          summary: "",
          duration: 3000,
          position: 'topRight'

        })

      }
    } else if (this.step === 2) {
      console.log('Transfer details form valid:', this.transferDetails.valid);

      if (this.transferDetails.valid) {
        this.transfer_step= true;
        this.step++;

      }else {
        this.toastService.error({
          detail : "vous devez remplir tous les champs!",
        summary: "",
        duration: 3000,
        position: "topLeft"})
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


  sendOtp(){
    console.log(this.beneficiarylDetails.value.username);

    this.transfer_service.sendOtp(this.beneficiarylDetails.value.email).subscribe(
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
    this.transfer_service.validateOtp(this.beneficiarylDetails.value.email, otp).subscribe(
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


  goToHome() {
    this.router.navigateByUrl('/Home/home');// Navigate to the home page
  }




}


