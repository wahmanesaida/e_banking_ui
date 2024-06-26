import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ConsoleAgentService } from '../../console-agent/console-agent.service';
import { NgToastService } from 'ng-angular-popup';
import { UserDto } from '../../../models/UserDto';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  users: UserDto[] = [];
  isReadOnly: boolean = false;
  selectedUser: UserDto | null = null;
  modalState: 'add' | 'edit' | 'view' | null = null;
  totalEntries: number;
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number;
  pages: number[];
  showSave:boolean=false;

  constructor(
    private userService: UsersService,
    private toast: NgToastService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  openModal(action: 'add' | 'edit' | 'view', user?: UserDto) {
    this.modalState = action;
    this.selectedUser = user ? { ...user } : ({} as UserDto);
    this.isReadOnly = action === 'view';
    if (action ===  'view') {
      this.showSave = false;
    }
    else{
      this.showSave = true;
    }
  }

  closeModal() {
    this.modalState = null;
    this.selectedUser = null;
    this.isReadOnly = false;
  }

  formatDate(event: Event) {
    const input = event.target as HTMLInputElement;
    const date = new Date(input.value);
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    input.value = formattedDate;
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe(
      (response) => {
        this.users = response;
        this.calculateTotalPages();
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
    this.userService.deleteUser(id).subscribe(
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

  searchUser(name: string) {
    this.userService.searchUser(name).subscribe(
      (response) => {
        this.users = [response];
      },
      (error: any) => {
        this.toast.error({
          detail: 'Pay Attention',
          summary: "this name not found",
          duration: 5000,
          position: 'topCenter',
        });
      }
    );
  }

  updateUserProperty(): void {
    this.userService.updateUserProperty(this.selectedUser).subscribe(
      (response) => {
        console.log(response);
       
      },
      (error) => {
        console.log(error);
      }
    );
  }

  addUser(): void {
    this.userService.addUser(this.selectedUser).subscribe(
      (response) => {
        console.log(response);
       
      },
      (error) => {
        console.log(error);
      }
    );
  }

  saveUser() {
    if (this.modalState === 'edit') {
      this.updateUserProperty();
      this.closeModal();
    } else if (this.modalState === 'add') {
      this.addUser();
      this.closeModal();
    }
  }

  getDisplayedItems() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.totalEntries);
    return this.users.slice(startIndex, endIndex);
  }
  

  changePage(page: number) {
    this.currentPage = page;
  }

  calculateTotalPages() {
    this.totalEntries = this.users.length;
    this.totalPages = Math.ceil(this.totalEntries / this.itemsPerPage);
    this.pages = Array(this.totalPages)
      .fill(0)
      .map((x, i) => i + 1);
  }

  isAnyFieldEmpty(): boolean {
    if (!this.selectedUser ||
        !this.selectedUser.name ||
        !this.selectedUser.title ||
        !this.selectedUser.ville ||
        !this.selectedUser.role ||
        !this.selectedUser.profession ||
        !this.selectedUser.pieceIdentite ||
        !this.selectedUser.datenaissance ||
        !this.selectedUser.paysEmission ||
        !this.selectedUser.payeNationale ||
        !this.selectedUser.numeroPieceIdentite ||
        !this.selectedUser.gsm ||
        !this.selectedUser.username ||
        !this.selectedUser.createTime ||
        !this.selectedUser.validitePieceIdentite ||
        !this.selectedUser.expirationPieceIdentite ||
        !this.selectedUser.account_amount ||
        !this.selectedUser.password) {
      return true;
    }
  
    return false;
  }


}
