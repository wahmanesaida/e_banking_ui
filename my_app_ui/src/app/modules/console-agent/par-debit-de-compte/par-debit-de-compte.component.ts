import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {TransferRequest} from "../../../models/TransferRequest.model";
import {ConsoleAgentService} from "../console-agent.service";
import {debounceTime, distinctUntilChanged} from "rxjs";
import {User} from "../../../models/User.model";
import { CheckAmountRequest } from '../../../models/CheckAmountRequest';
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


  title = 'angular13bestcode';

  personalDetails!: FormGroup;
  transferDetails!: FormGroup;
  Otp!: FormGroup;
  personal_step = false;
  transfer_step = false;
  education_step = false;
  step = 1;
  validOtp: boolean;

  transfer: TransferRequest;
  tt = "saida";

  constructor(private formBuilder: FormBuilder, private transfer_service: ConsoleAgentService) {
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

  // Integrate the changes for fetching user data and patching the form
  searchByPhoneNumber() {
    const phone = this.personal['phone'].value;

    if (phone) {
      this.transfer_service.getUserByPhone(phone).subscribe(
        (user: User) => {
          if(user){
            this.patchFormWithUserData(user);
            this.errorMessage='';
          } else {
            console.log(user);
            this.errorMessage= "Invalid phone number ! ";
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
          console.log('Transfer successful:', response);
          this.transferDone = true;
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

 /** previous(
  ) {
    if (this.step > 1) {
      this.step--;
    }
    if (this.step === 1) {
      this.address_step = true;
    }
    if (this.step === 2) {
      this.education_step = false;
      this.address_step = true;
    }
    if(this.step ===3){
      this.personal_step=false

    }
    // Add the following lines to ensure form data is visible when navigating back
    this.personalDetails.updateValueAndValidity();
    this.transferDetails.updateValueAndValidity();
  }**/


  submit() {

    if (this.step == 3) {
      this.education_step = true;
      this.makeTransferAgent();
      if (this.Otp.invalid) {
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


  checkAmountTransfer(){
    if (this.transferDetails.invalid) {
      this.transferDetails.markAllAsTouched(); // Mark all fields as touched to display errors
      return;
    }
    const checkAmountRequest: CheckAmountRequest = {
      transfertDto: {
        amount_entred: this.transferDetails.value.amount,
        notification: this.transferDetails.value.notification,
        typeOftransfer: this.personalDetails.value.typetransfer,
        fees: this.transferDetails.value.typeOffees
      },
      user:{
        account_amount: this.userAccountAmount,
        title: this.transferDetails.get('title').value,
        pieceIdentite: this.transferDetails.get('pieceIdentite').value,
        paysEmission: this.transferDetails.get('paysEmission').value,
        numeroPieceIdentite: this.transferDetails.get('numeroPieceIdentite').value,
        expirationPieceIdentite: this.transferDetails.get('expirationPieceIdentite').value,
        validitePieceIdentite: this.transferDetails.get('validitePieceIdentite').value,
        datenaissance: this.transferDetails.get('datenaissance').value,
        profession: this.transferDetails.get('profession').value,
        payeNationale: this.transferDetails.get('payeNationale').value,
        ville: this.transferDetails.get('ville').value,
        gsm: this.transferDetails.get('gsm').value,
        id: this.transferDetails.get('id').value,
        username: this.transferDetails.get('username').value,
      },
      checkAmount:this.transferDetails.get('amount').value
    }
    this.transfer_service.checkAmountOfTransfert(checkAmountRequest).subscribe(
      (response: any) => {
        this.amountMessage = response.message;
       /*  if (response.message === 'OTP is valid') {
          this.otpValidated = true;
        } */
      },
      (error) => {
        this.amountMessage = error.error;
        console.log(this.errorMessage);

      }


    );
  }




}






