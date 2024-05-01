import { Component } from '@angular/core';
import { User } from '../../../models/User.model';

@Component({
  selector: 'app-modal-user',
  templateUrl: './modal-user.component.html',
  styleUrl: './modal-user.component.css',
})
export class ModalUserComponent {
  selectedUser: User | null = null;
  modalState: 'add' | 'edit' | 'view' | null = null;


  openModal(action: 'add' | 'edit' | 'view', user?: User) {
    this.modalState = action;
    this.selectedUser = user ? { ...user } : null;
  }
  


}
