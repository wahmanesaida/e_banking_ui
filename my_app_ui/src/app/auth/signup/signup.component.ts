import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {
  showPassword1: boolean = false;
  showPassword2: boolean = false;
  signupForm:FormGroup | undefined

  
  constructor(
    private service: AuthService, 
    private fb: FormBuilder) {
   
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


  signup(){
    console.log(this.signupForm.value);
    this.service.signup(this.signupForm.value).subscribe((response)=>{
      console.log(response);
      
    })
    
  }

  togglePasswordVisibility() {
    this.showPassword1 = !this.showPassword1;
  }

  togglePasswordVisibility2(){
    this.showPassword2 = !this.showPassword2;

  }





}
