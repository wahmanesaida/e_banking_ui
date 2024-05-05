import {Component, OnInit} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {NgToastModule, NgToastService} from "ng-angular-popup";
import {Transfert} from "../../console-agent/servir-transfert/models/Transfert";
import {BackOfficeService} from "../back-office.service";
import {
  DialogBeneficiaryComponent
} from "../../console-agent/par-debit-de-compte/dialog-beneficiary/dialog-beneficiary.component";
import {BeneficiaryDto} from "../../../models/BeneficiaryDto.model";
import {MatDialog} from "@angular/material/dialog";
import {ModalTransferComponent} from "./modal-transfer/modal-transfer.component";
import {bloqueRequest} from "../../../models/bloqueRequest.model";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-blocking-process',
  templateUrl: './blocking-process.component.html',
  styleUrl: './blocking-process.component.css'
})
export class BlockingProcessComponent implements OnInit{
  constructor(private formBuilder: FormBuilder, private backOfficeService: BackOfficeService, private toastService: NgToastService, private dialog: MatDialog) {
  }
  BlockageDetails: FormGroup;
  errorMessage: string;
  transfert$: Transfert;
  ngOnInit(): void {
    this.BlockageDetails=this.formBuilder.group({
      "transferRefr": ['', Validators.required],
      "status": ['', Validators.required],
      "motif": ['', Validators.required]
    })
  }
  get Blockage(){
    return this.BlockageDetails.controls;
  }

  searchTransfertByReference() {
    const reference = this.Blockage['transferRefr'].value;
    console.log("Référence du transfert : ", reference);
    if (reference) {
      this.backOfficeService.GetTranserByReference(reference).subscribe(
        (transfert: Transfert) => {
          if (transfert) {
            console.log("Détails du transfert trouvé : ", transfert);
            this.openDialog(transfert); // Appel correct de la méthode openDialog
            this.toastService.info({ detail: "SUCCES", summary: "le transfert est trouvé avec succès", duration: 5000, position: 'topRight' });
            this.errorMessage = '';
            this.transfert$=transfert;
            this.BlockageDetails.get('transferRefr').setValue(transfert.transferRef);


          } else {
            this.errorMessage = "Identifiant invalide, il n'y a aucun transfert avec cet identifiant !!";
            this.toastService.error({ detail: "Pay Attention", summary: this.errorMessage, duration: 5000, position: 'topCenter' });
          }
        },
        (error) => {
          console.error("Erreur lors de la recherche du transfert : ", error);
          this.errorMessage = "Une erreur s'est produite lors de la recherche du transfert";
          this.BlockageDetails.get('transferRefr').setValue('');

          this.toastService.error({ detail: "Pay Attention", summary: this.errorMessage, duration: 5000, position: 'topCenter' });
        }
      );
    }
  }


  openDialog(transfert: Transfert) {
    const dialogRef = this.dialog.open(ModalTransferComponent, {
      data: { transfert: transfert } // Passer les données du transfert
    });
  }

  submit(){
    console.log(this.BlockageDetails.get('status'));
    const request: bloqueRequest={
      reference:this.BlockageDetails.value.transferRefr,
      status:this.BlockageDetails.value.status
    }
    this.backOfficeService.blockTransfer(request).subscribe(
      (response) => {
        if(response.message== "Vous avez bloqué avec succés le transfert souhaité"){
          this.toastService.success({ detail: "Transfer Message", summary: response.message, duration: 6000, position: 'topRight' });

        }else if(response.message == "Vous avez débloqué avec succés le transfert souhaité"){
          this.toastService.success({ detail: "Transfer Message", summary: response.message, duration: 6000, position: 'topRight' });

        }else{
          this.toastService.error({ detail: "Transfer Message", summary: response.message, duration: 6000, position: 'topRight' });

        }

      },
    (error) => {
      this.toastService.error({ detail: "Transfer Message", summary: error.message, duration: 6000, position: 'topRight' });


    }

  )


  }




}
