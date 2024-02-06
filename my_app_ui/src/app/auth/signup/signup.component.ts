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
  signupForm:FormGroup | undefined

  
  constructor(
    private service: AuthService, 
    private fb: FormBuilder) {
   
  }


  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name : new FormControl('', Validators.required),
      username: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', Validators.required),
      confirmPassword : new FormControl('', Validators.required)
    }, {validator:this.passwordMatchValidator})
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




}
