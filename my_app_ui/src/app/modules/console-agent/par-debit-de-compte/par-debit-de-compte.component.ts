import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {TransferRequest} from "../../../models/TransferRequest.model";
import {ConsoleAgentService} from "../console-agent.service";
import {debounceTime, distinctUntilChanged} from "rxjs";
import {User} from "../../../models/User.model";
import { CheckAmountRequest } from '../../../models/CheckAmountRequest';
import {IToast, NgToastService} from "ng-angular-popup";
import {ToastrService} from "ngx-toastr";
// @ts-ignore
import { NgToastConfig } from 'ng-angular-popup';

@Component({
  selector: 'app-par-debit-de-compte',
  templateUrl: './par-debit-de-compte.component.html',
  styleUrl: './par-debit-de-compte.component.css'
})
export class ParDebitDeCompteComponent implements OnInit {
  userAccountAmount : number
  amountMessage : string;
  errorMessage: string;
  transferDone: boolean = false;
  otpValidated: boolean = false;
  otpSent: boolean = false;
  errorPhone: string='';
  transferMessage: string;



  title = 'angular13bestcode';

  personalDetails!: FormGroup;
  transferDetails!: FormGroup;
  Otp!: FormGroup;
  personal_step = false;
  transfer_step = false;
  education_step = false;
  step = 1;
  validOtp: boolean;

  tt = "saida";

  constructor(private formBuilder: FormBuilder, private transfer_service: ConsoleAgentService, private toastService: NgToastService) {
  }

  ngOnInit() {

    this.personalDetails = this.formBuilder.group({
      typetransfer: ['', Validators.required],
      phone: ['+212', Validators.required],
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
      gsm: ['', Validators.required],
      id_donor: ['', Validators.required],
      username: ['', Validators.required],


    });


    console.log(this.personalDetails);

    this.transferDetails = this.formBuilder.group({
      amount: ['', Validators.required],
      //saida: ['', Validators.required],
      id: ['', Validators.required],
      name: ['', Validators.required],
      first_name: ['', Validators.required],
      email: ['', Validators.required],
      notification: ['', Validators.required],
      typeOffees: ['', Validators.required],



    });

    this.Otp = this.formBuilder.group({
      otp: ['', Validators.required]
    });


  }

  get personal() {
    return this.personalDetails.controls;
  }

  get transferD() {
    return this.transferDetails.controls;
  }

  get otp() {
    return this.Otp.controls;
  }

  searchBeneficiaryById(){
    const id=this.transferDetails['id'].value;
    console.log(id);
    if(id){
      this.transfer_service.selectBeneficiary(id).subscribe(
      );
      this.PatchFormWithBeneData()
    }
  }

  PatchFormWithBeneData(){}

  // Integrate the changes for fetching user data and patching the form
  searchByPhoneNumber() {

    const phone = this.personal['phone'].value;
    //this.toastr.info('Processing your request. Please wait...', 'Notification');

    if (phone) {
      this.transfer_service.getUserByPhone(phone).subscribe(
        (user: User) => {
          if(user){
            this.patchFormWithUserData(user);
            this.toastService.info({ detail: "SUCCES", summary: "user found successfuly", duration: 5000, position: 'topCenter' });

            this.errorMessage='';
          } else {
            console.log(user);
            this.errorMessage= "Invalid phone number ! ";
            this.toastService.error({ detail: "Pay Attention", summary: this.errorMessage, duration: 5000, position: 'topCenter' });

          }

        },
        (error: any) => {
          if(error.status === 400){
            this.errorPhone=error.error.message
          }else {
            console.error('Error fetching user data:', error);

          }

        }
      );
    }
  }

  patchFormWithUserData(user: User) {
    this.personalDetails.get('title').setValue(user.title);
    this.personalDetails.get('pieceIdentite').setValue(user.pieceIdentite);
    this.personalDetails.get('paysEmission').setValue(user.paysEmission);
    this.personalDetails.get('numeroPieceIdentite').setValue(user.numeroPieceIdentite);
    this.personalDetails.get('expirationPieceIdentite').setValue(user.expirationPieceIdentite);
    this.personalDetails.get('validitePieceIdentite').setValue(user.validitePieceIdentite);
    this.personalDetails.get('datenaissance').setValue(user.datenaissance);
    this.personalDetails.get('profession').setValue(user.profession);
    this.personalDetails.get('payeNationale').setValue(user.payeNationale);
    this.personalDetails.get('ville').setValue(user.ville);
    this.personalDetails.get('gsm').setValue(user.gsm);
    this.personalDetails.get('id_donor').setValue(user.id);
    this.personalDetails.get('username').setValue(user.username);
    this.userAccountAmount = user.account_amount;
    this.personalDetails.updateValueAndValidity();
  }

  makeTransferAgent(): void {
     if (this.transferDetails.valid) {
      console.log(this.transferDetails.value.amount);
      console.log(this.transferDetails.value.notification);
      console.log(this.transferDetails.value.typeOffees);
      console.log(this.personalDetails.value.typetransfer)
      console.log(this.transferDetails.value.id);
      console.log(this.transferDetails.value.first_name);
      console.log(this.transferDetails.value.name);
      console.log(this.transferDetails.value.gsm);
      console.log(this.transferDetails.value.email);
      const transferAgent: TransferRequest = {
        transfertDto: {
          amount_entred: this.transferDetails.value.amount,
          notification: this.transferDetails.value.notification,
          typeOftransfer: this.personalDetails.value.typetransfer,
          fees: this.transferDetails.value.typeOffees
        },
        id_beneficiary: this.transferDetails.value.id,
        bene: {
          firstName: this.transferDetails.value.first_name,
          lastname: this.transferDetails.value.name,
          //GSM: this.transferDetails.value.gsm,
          username: this.transferDetails.value.email
        },
        id_user: this.personalDetails.getRawValue()['id_donor'] // New property
      };
      this.personalDetails.updateValueAndValidity();
      console.log("this is transer dto: " + transferAgent.transfertDto.typeOftransfer)

      // this.formdataservice.setFormData(transferAgent);

      this.transfer_service.makeTransferAgent(transferAgent).subscribe(
        (response) => {
          console.log('Transfer Message:', response);
          this.transferMessage=response.message;
          this.toastService.info({ detail: "Transfer Message", summary: response.message, duration: 5000, position: 'topRight' });

          if(response.message == "congratulations, your transaction has been successful with a good amount"){
            this.transferDone = true;

          }

        },
        (error) => {
          console.error('An error occurred:', error);
        }
      );
    }
  }




  next() {
    if (this.step === 1) {
      console.log('Personal details form valid:', this.personalDetails.valid);
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

    if (this.step == 3) {
      this.education_step = true;
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


      this.makeTransferAgent();
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
      //alert("Well done!!")
    }
  }


  sendOtp(){
    console.log(this.personalDetails.value.username);

    this.transfer_service.sendOtp(this.personalDetails.value.username).subscribe(
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
    this.transfer_service.validateOtp(this.personalDetails.value.username, otp).subscribe(
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










}






