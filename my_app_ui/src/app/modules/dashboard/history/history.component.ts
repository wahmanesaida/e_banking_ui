import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AsyncPipe, NgForOf} from "@angular/common";
import {NgToastModule, NgToastService} from "ng-angular-popup";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {HistoryService} from "./history.service";
import {List} from "postcss/lib/list";
import {Transfert} from "../../console-agent/servir-transfert/models/Transfert";
import {Observable} from "rxjs";
import {MulticriteriaSearchDto} from "../../../models/MulticriteriaSearchDto";
import {ToastrService} from "ngx-toastr";
import {ConsoleAgentService} from "../../console-agent/console-agent.service";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent implements OnInit{

  constructor(private historyService: HistoryService, private formBuilder: FormBuilder, private transfer_service: ConsoleAgentService,
              private toast: NgToastService) {
  }
  searchform: FormGroup;
  transferts: Transfert[]=[];
  page=1;
  pageSize=10;
  @Output() nextPage = new EventEmitter<any>();
  @Output() prevPage = new EventEmitter<any>();
  ngOnInit(): void {
    this.searchform = this.formBuilder.group({
      criteria: ['', Validators.required],
    });
    this.allTranfers();
  }



  get StartIndex():number{
    return (this.page -1)* (this.pageSize)
  }

  get EndIndex():number{
    return Math.min(this.StartIndex + this.pageSize - 1, this.transferts.length - 1);
  }

  onNextPage(page: number) {
    if (this.page * this.pageSize < this.transferts.length) {
      this.page++;
      this.nextPage.emit(); // Émet l'événement nextPage
      console.log(this.page);
    }
  }

  onPrevPage(page: number) {
    if (this.page > 1) {
      this.page--;
      this.prevPage.emit(); // Émet l'événement prevPage
    }
    console.log(this.page);
  }


  allTranfers(){
    this.transfer_service.getAlltransactions().subscribe(
      (response) => {
        this.transferts = response;
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
      return;
    }

    const searchDto: MulticriteriaSearchDto = {
      [criterion]: searchInput,
    };

    this.searchTransfers(searchDto);
  }


  determineSearchCriterion(searchInput: string): keyof MulticriteriaSearchDto | null {
    if (/^837\d{10}$/.test(searchInput)){
      return 'transferRef';
    }  else  {
      return null;
    }
  }



  searchTransfers(searchDto: MulticriteriaSearchDto) {
    if (!searchDto) {
      this.toast.error({
        detail: 'Vous devez taper un référence de transfert',
        summary: 'Error',
        duration: 5000,
        position: 'topCenter',
      });
      return;
    }

    this.transfer_service.searchTransfertBackOffice(searchDto).subscribe(
      (response: any) => {
        this.transferts = response;
        this.page = 1;
      },
      (error: any) => {
        this.toast.error({
          detail: 'Vous devez taper un référence de transfert',
          summary: error.error,
          duration: 5000,
          position: 'topCenter',
        });
      }
    );
  }



  protected readonly Math = Math;
}
