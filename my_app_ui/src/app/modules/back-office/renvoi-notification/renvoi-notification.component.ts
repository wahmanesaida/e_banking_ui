import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NgToastService } from 'ng-angular-popup';
import { ConsoleAgentService } from '../../console-agent/console-agent.service';
import { Transfert } from '../../console-agent/servir-transfert/models/Transfert';
import { TransferRefDTO } from '../../console-agent/servir-transfert/models/TransferRefDTO';
import { MailStructure } from '../../../models/MailStructure';
import { RenvoiDto } from '../../../models/RenvoiDto';

@Component({
  selector: 'app-renvoi-notification',
  templateUrl: './renvoi-notification.component.html',
  styleUrl: './renvoi-notification.component.css'
})
export class RenvoiNotificationComponent implements OnInit {
  searchform: FormGroup;
  transfers: Transfert = {};
  transferRef:string;
  mailStructure:MailStructure;
  renvoiDto: RenvoiDto;

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
        (transfert: Transfert) => {
          this.transfers = transfert;
          //console.log(transfert);
          this.renvoiDto ={
            transferRef:  this.searchform.get('transferRef')?.value
          }
          //console.log(this.renvoiDto);
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
  
  renvoyerNotification() {
    console.log("this is the renvoiDTO:", this.renvoiDto);
    this.transfer_service.renvoyerNotification(this.renvoiDto).subscribe(
      (res) => {
        console.log(res);
      },
      (error) => {
        let errorMessage = "Cannot renvoyer notification for transfers with status other than 'A_servir'";
        if (error.error && error.error.message) {
          errorMessage = error.error.message;
        }
        this.toast.error({
          detail: 'Pay Attention',
          summary: errorMessage,
          duration: 5000,
          position: 'topCenter',
        });
      }
    );
  }
  
  

}
