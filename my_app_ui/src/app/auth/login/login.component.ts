import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import {User} from "../../models/User.model";
import {jwtDecode} from "jwt-decode";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  showPassword: boolean = false;
  loginForm: FormGroup;
  public currentUser: User;
  currentUserDecode: any;
  showErrorModal = false;
  errorMessage = '';

  constructor(
    private service:AuthService,
    private fb:FormBuilder,
    private router: Router
  ) {

  }

  ngOnInit(): void {
      this.loginForm = this.fb.group({
        username: new FormControl('', [Validators.email, Validators.required]),
        password: new FormControl('',  [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/)])
      })
  }

  login(){

    //console.log(this.loginForm.value);
    this.service.login(this.loginForm.value).subscribe(
      (response) => {
      //console.log(response);
      if (response.token) {
        alert(response.token);
        const jwtToken = response.token;
        const idd=response.id;
        localStorage.setItem('JWT', jwtToken);
        localStorage.setItem('id', idd)
        console.log("iddddddddd  " + localStorage.getItem('id'));
        this.router.navigateByUrl('/Auth/home');
      }
    },
    (error) => {
      this.loginError();
    }
    )
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }


  loginError() {
    this.service.loginError(this.loginForm.value).subscribe(
      (response) => {
        // Handle successful login
      },
      (error) => {
        if (error.status === 401) {
          if (error.error === "Wrong password") {
            this.errorMessage = 'Wrong password.';
          } else if (error.error === "Username doesn't exist") {
            this.errorMessage = 'User not found.';
          } else {
            this.errorMessage = 'An unexpected error occurred.';
          }
        } else {
          this.errorMessage = 'An unexpected error occurred.';
        }
        this.showErrorModal = true;
      }
    );
  }

  tryAgain() {
    this.showErrorModal = false;
  }

  goToHome() {
    this.router.navigateByUrl('/Auth/home'); // Navigate to the home page
  }




}
