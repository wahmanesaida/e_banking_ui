import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ConsoleAgentService } from '../../console-agent/console-agent.service';
import { NgToastService } from 'ng-angular-popup';
import { User } from '../../../models/User.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  selectedUser: User | null = null;
  modalState: 'add' | 'edit' | 'view' | null = null;

  openModal(action: 'add' | 'edit' | 'view', user?: User) {
    document.getElementById('modal').style.display = 'block';
    console.log(user);
    this.modalState = action;
    console.log(this.modalState);
    this.selectedUser = user ? { ...user } : null;
  }
  saveChanges() {
    this.closeModal();
  }

  closeModal() {
    document.getElementById('modal').style.display = 'none';
    this.modalState = null;
    this.selectedUser = null;
  }

  formatDate() {
    const input = document.getElementById('validity') as HTMLInputElement;
    const date = new Date(input.value);
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    input.value = formattedDate;
  }

  users: User[] = [];

  ngOnInit(): void {
    this.getAllUsers();
  }

  constructor(
    private transfer_service: ConsoleAgentService,
    private toast: NgToastService
  ) {}

  getAllUsers() {
    this.transfer_service.getAllUsers().subscribe(
      (response) => {
        this.users = response;
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

  deleteUser(id: number) {
    console.log(id);
    this.transfer_service.deleteUser(id).subscribe(
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

  searchUser(id: number) {
    this.transfer_service.searchUser(id).subscribe(
      (response) => {
        console.log(response);
        this.users = [response];
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
