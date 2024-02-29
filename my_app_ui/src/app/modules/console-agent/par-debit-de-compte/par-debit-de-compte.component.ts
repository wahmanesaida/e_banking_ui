import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {TransferRequest} from "../../../models/TransferRequest.model";
import {ConsoleAgentService} from "../console-agent.service";
import {debounceTime, distinctUntilChanged} from "rxjs";
import {User} from "../../../models/User.model";

@Component({
  selector: 'app-par-debit-de-compte',
  templateUrl: './par-debit-de-compte.component.html',
  styleUrl: './par-debit-de-compte.component.css'
})
export class ParDebitDeCompteComponent implements OnInit {


  title = 'angular13bestcode';

  personalDetails!: FormGroup;
  transferDetails!: FormGroup;
  Otp!: FormGroup;
  personal_step = false;
  address_step = false;
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
      phone: ['', Validators.required],
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
      id: ['', Validators.required],
      name: ['', Validators.required],
      first_name: ['', Validators.required],
      notification: ['', Validators.required],
      typeOffees: ['', Validators.required],
      email: ['', Validators.required]


    });

    this.Otp = this.formBuilder.group({
      otpfield: ['', Validators.required]
    });

    this.Otp.get('otpfield').valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(() => {
      const otpValue = this.Otp.value.otpfield;
      console.log("this is the otp: " + otpValue);
      this.validateOtp(otpValue);
    });

    this.validOtp = false;


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
          this.patchFormWithUserData(user);
        },
        (error: any) => {
          console.error('Error fetching user data:', error);
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
      console.log("this is transer dto: " + transferAgent.transfertDto.typeOftransfer)

      // this.formdataservice.setFormData(transferAgent);

      this.transfer_service.makeTransferAgent(transferAgent).subscribe(
        (response) => {
          console.log('Transfer successful:', response);
        },
        (error) => {
          console.error('An error occurred:', error);
        }
      );
    }
  }

  validateOtp(otpValue: string) {
    console.log("method is called ")
    console.log("this is the otp: " + otpValue)
    this.transfer_service.validateOtp(this.personalDetails.value.username, otpValue).subscribe(
      (response) => {
        console.log('OTP validated successfully:', response);
        if (response === "OTP validated successfully") {
          this.validOtp = true;
        } else {
          this.validOtp = false;
        }
      },
      (error) => {
        console.error('An error occurred:', error);
        console.error('Status code:', error.status);
        console.error('Error message:', error.message);
        console.error('Error body:', error.body);
      }
    );
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
        this.address_step = true;
        this.step++;
        console.log('email:', this.personalDetails.value.username);
        this.transfer_service.sendOtp(this.personalDetails.value.username).subscribe(
          (response) => {
            console.log('email has been send  successfully:', response);
          },
          (error) => {
            console.error('An error occurred:', error);
          }
        );
      }
    }
  }


  previous() {
    this.step--

    if (this.step == 1) {
      this.address_step = false;
    }
    if (this.step == 2) {
      this.education_step = false;
    }


  }

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
}






