import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
import { BeneficiairesService } from './beneficiaires.service';
import { Beneficiary } from '../../console-agent/servir-transfert/models/Beneficiary';

@Component({
  selector: 'app-gestion-beneficiaires',
  templateUrl: './gestion-beneficiaires.component.html',
  styleUrl: './gestion-beneficiaires.component.css'
})
export class GestionBeneficiairesComponent implements OnInit {

  users: Beneficiary[] = [];
  isReadOnly: boolean = false;
  selectedUser: Beneficiary | null = null;
  modalState: 'add' | 'edit' | 'view' | null = null;
  totalEntries: number;
  id:number;
  idBene:number;
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number;
  pages: number[];
  showSave:boolean=false;

  constructor(
    private beneService: BeneficiairesService,
    private toast: NgToastService,
    private cdr: ChangeDetectorRef,
  ) {
    this.id = +localStorage.getItem('id');
  }

  ngOnInit(): void {
    this.getAllBeneficiaries(this.id);
  }

  openModal(action: 'add' | 'edit' | 'view' , user?: Beneficiary) {
    this.modalState = action;
    this.selectedUser = user ? { ...user } : ({} as Beneficiary);
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

  getAllBeneficiaries(id:number) {
    this.beneService.getAllBeneficiaries(id).subscribe(
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

  deleteBene(id:number) {
    this.beneService.deleteBeneficiary(id).subscribe(
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

  updateBeneProperty(): void {
    this.beneService.updateBeneficiaryProperty(this.selectedUser).subscribe(
      (response) => {
        console.log(response);
       
      },
      (error) => {
        console.log(error);
      }
    );
  }

  addBene(): void {
    this.beneService.addBeneficiary(this.selectedUser).subscribe(
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
      this.updateBeneProperty();
      this.closeModal();
    } else if (this.modalState === 'add') {
      this.addBene();
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

 



}
