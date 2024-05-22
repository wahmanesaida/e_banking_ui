import { Component, OnInit } from '@angular/core';
import { UserDto } from '../../../models/UserDto';
import { UsersService } from '../../dashboard/users/users.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {

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
