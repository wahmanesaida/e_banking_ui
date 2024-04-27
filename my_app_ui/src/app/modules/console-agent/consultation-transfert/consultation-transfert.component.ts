import { Component, OnInit } from '@angular/core';
import { MulticriteriaSearchDto } from '../../../models/MulticriteriaSearchDto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConsoleAgentService } from '../console-agent.service';
import * as moment from 'moment';
import { Transfert } from '../servir-transfert/models/Transfert';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-consultation-transfert',
  templateUrl: './consultation-transfert.component.html',
  styleUrl: './consultation-transfert.component.css',
})
export class ConsultationTransfertComponent implements OnInit {
  searchform: FormGroup;
  transfers: Transfert[] = [];

  ngOnInit(): void {
    this.searchform = this.formBuilder.group({
      criteria: ['', Validators.required],
    });
    this.getAllTransfers();
  }

  constructor(
    private formBuilder: FormBuilder,
    private transfer_service: ConsoleAgentService,
    private toast: NgToastService
  ) {}

  onSubmit() {
    const searchInput = this.searchform.get('criteria')!.value;
    const criterion = this.determineSearchCriterion(searchInput);
    
    if (!criterion) {
      this.toast.error({
        detail: 'You have entered a wrong criteria',
        summary: 'Error',
        duration: 5000,
        position: 'topCenter',
      });
    }
  
    const searchDto: MulticriteriaSearchDto = {
      [criterion]: searchInput,
    };
  
    this.searchTransfers(searchDto);
  }
  
  determineSearchCriterion(searchInput: string): keyof MulticriteriaSearchDto | null {
    if (/^837\d{10}$/.test(searchInput)){
      return 'transferRef';
    } else if (['ACCOUNT_DEBIT', 'SPECIES', 'WALLET'].includes(searchInput.toUpperCase())) {
      return 'typeOftransfer';
    } else if (['A_servir', 'Payé', 'Extourné', 'Restitué', 'Bloqué', 'Débloqué', 'Débloqué_a_servir', 'Déshérence'].includes(searchInput)) {
      return 'status';
    } else if (this.isValidISO8601Date(searchInput)) {
      return 'createTime';
    } else  {
      return null;
    }
  }
  
  isValidISO8601Date(dateString: string): boolean {
    return !isNaN(Date.parse(dateString));
  }
  
  searchTransfers(searchDto: MulticriteriaSearchDto) {
    if (!searchDto) {
      this.toast.error({
        detail: 'You have entered a wrong criteria',
        summary: 'Error',
        duration: 5000,
        position: 'topCenter',
      });
      return; // Exit the method early if searchDto is null
    }
  
    this.transfer_service.searchTransfertBackOffice(searchDto).subscribe(
      (response: any) => {
        this.transfers = response; 
        console.log(this.transfers);
      },
      (error: any) => {
        this.toast.error({
          detail: 'You have entered a wrong criteria',
          summary: error.error,
          duration: 5000,
          position: 'topCenter',
        });
      }
    );
  }
  

  exportTransfersToExcel(): void {
    this.transfer_service.exportTransfersToExcel(this.transfers).subscribe(
      (response: Blob) => {
        const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'transfers.xlsx';
        link.click();
        window.URL.revokeObjectURL(url);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getAllTransfers(){
    this.transfer_service.getAllTransfers().subscribe(
      (response) => {
        this.transfers = response; 
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
