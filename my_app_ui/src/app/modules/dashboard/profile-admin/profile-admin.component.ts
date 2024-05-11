import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users/users.service';
import { NgToastService } from 'ng-angular-popup';
import { UserDto } from '../../../models/UserDto';

@Component({
  selector: 'app-profile-admin',
  templateUrl: './profile-admin.component.html',
  styleUrl: './profile-admin.component.css'
})
export class ProfileAdminComponent implements OnInit {
  id: number;
  userInfo:UserDto;

  constructor(private userService:UsersService, private toast: NgToastService) {
    this.id = +localStorage.getItem('id');
  }

  ngOnInit(): void {   
    this.getAdminProfile(); 
  }

  getAdminProfile(){

    this.userService.getAdminProfile(this.id).subscribe(
      (response) => {
          this.userInfo = response;
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
