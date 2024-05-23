import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrl: './error-page.component.css'
})
export class ErrorPageComponent {

  constructor(private router: Router) {
  }

  goToHome() {
    this.router.navigateByUrl('Home/home'); // Navigate to the home page
  }



}
