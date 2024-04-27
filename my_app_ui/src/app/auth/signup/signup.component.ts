import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {
  showPassword1: boolean = false;
  showPassword2: boolean = false;
  signupForm:FormGroup | undefined;
  showErrorModal = false;
  showSuccessModal = false;
  errorMessage = '';

  
  constructor(
    private service: AuthService, 
    private fb: FormBuilder,
    private router: Router,
    private toast: NgToastService) {
   
  }


  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name : new FormControl('', Validators.required),
      username: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/)]),
      confirmPassword : new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/)])
    })
  }

  private passwordMatchValidator(fg:FormGroup){
    const password = fg.get('password')?.value;
    const confirmPassword = fg.get('confirmPassword')?.value;
    if (password != confirmPassword) {
      fg.get("confirmPassword")?.setErrors({ passwordMismatch:true });
    }else{
      fg.get("confirmPassword")?.setErrors(null);
    }

  }

  checkCredentialsExist() {
    this.service.checkCredentialsExist(this.signupForm.value).subscribe(
      (response) => {
        this.signup();
        //make a toast here 
      },
      (error) => {
        // User credentials already exist, show error modal
        this.errorMessage = 'User credentials already exist.';
        this.showErrorModal = true;
      }
    );
  }
  
  signup() {
    this.service.checkCredentialsExist(this.signupForm.value).subscribe(
      () => {
        // If credentials exist, show error modal
        this.showErrorModal = true;
        this.errorMessage = 'User already exists, enter new credentials';
      },
      (error) => {
        // If credentials don't exist, proceed with signup
        if (error.status === 404) {
          this.service.signup(this.signupForm.value).subscribe(
            () => {
              this.toast.success({
                detail: 'Congrats !!',
                summary: 'User was created successfuly',
                duration: 5000,
                position: 'topCenter',
              });
            },
            (error) => {
              // Handle other errors
              console.error('Signup error:', error);
            }
          );
        } else {
          console.error('Check credentials error:', error);
        }
      }
    );
  }
  

  togglePasswordVisibility() {
    this.showPassword1 = !this.showPassword1;
  }



  togglePasswordVisibility2(){
    this.showPassword2 = !this.showPassword2;

  }


  tryAgain() {
    this.showErrorModal = false;
  }

  closeSuccessModal() {
    this.showSuccessModal = false;
  }


  goToHome() {
    this.router.navigateByUrl('/Auth/home');// Navigate to the home page
  }
  





}
