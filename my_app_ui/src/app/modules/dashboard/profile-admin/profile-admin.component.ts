import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users/users.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-profile-admin',
  templateUrl: './profile-admin.component.html',
  styleUrl: './profile-admin.component.css'
})
export class ProfileAdminComponent implements OnInit {

  constructor(private userService:UsersService, private toast: NgToastService) {
  }

  ngOnInit(): void {    
  }

  getAdminProfile(id:number){
    this.userService.getAdminProfile(id).subscribe(
      (response) => {
        console.log(response);
      },
      (error: any) => {
        this.toast.error({
          detail: 'Pay Attention',
          summary: error.error,
          duration: 5000,
          position: 'topCenter',
        });
      }
    );
  }



}
