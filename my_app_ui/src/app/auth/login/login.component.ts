import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
 
  constructor(
    private service:AuthService,
    private fb:FormBuilder,
    private router: Router
  ) {
    
  }

  ngOnInit(): void {
      this.loginForm = this.fb.group({
        username: new FormControl('', [Validators.email, Validators.required]),
        password: new FormControl('', Validators.required)
      })
  }

  login(){
    console.log(this.loginForm.value);
    this.service.login(this.loginForm.value).subscribe((response) => {
      console.log(response);
      if (response.token) {
        alert(response.token);
        const jwtToken = response.token;
        localStorage.setItem('JWT', jwtToken);
        this.router.navigateByUrl('/Auth/home');
      }
    })
  }



}
