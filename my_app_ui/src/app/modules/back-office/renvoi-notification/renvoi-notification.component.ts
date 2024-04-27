import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NgToastService } from 'ng-angular-popup';
import { ConsoleAgentService } from '../../console-agent/console-agent.service';
import { Transfert } from '../../console-agent/servir-transfert/models/Transfert';
import { TransferRefDTO } from '../../console-agent/servir-transfert/models/TransferRefDTO';

@Component({
  selector: 'app-renvoi-notification',
  templateUrl: './renvoi-notification.component.html',
  styleUrl: './renvoi-notification.component.css'
})
export class RenvoiNotificationComponent implements OnInit {
  searchform: FormGroup;
  transfers: Transfert = {};

  ngOnInit(): void {
    this.searchform = this.formBuilder.group({
      transferRef: ['', Validators.required],
    });
    
  }

  constructor(
    private formBuilder: FormBuilder,
    private transfer_service: ConsoleAgentService,
    private toast: NgToastService
  ) {}

  onSubmit() {
    this.searchTransfer();
  }

   searchTransfer() {
    try {
      const transferDto: TransferRefDTO = {
        transferRef: this.searchform.get('transferRef')?.value,
      };
      this.transfer_service.searchTransfer(transferDto).subscribe(
        (response) => {
          this.transfers = response;
          console.log(response);
          
        },
        (error) => {
          this.toast.error({
            detail: 'Pay Attention',
            summary: error.error,
            duration: 5000,
            position: 'topCenter',
          });
        }
      );
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }
  

 

  renvoyerNotification(){

  }

  

}
