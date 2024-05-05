import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatChipOption} from "@angular/material/chips";
import {data} from "autoprefixer";

@Component({
  selector: 'app-modal-transfer',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatChipOption
  ],
  templateUrl: './modal-transfer.component.html',
  styleUrl: './modal-transfer.component.css'
})
export class ModalTransferComponent {

  TransferFormGroup: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ModalTransferComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.TransferFormGroup = this.formBuilder.group({
      transferReference: [''],
      montant: [''],
      TransferType: [''],
      clientName: [''],
      beneficiaryName: [''],
      status: [''],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();

  }

  onSubmit(): void {
    if (this.TransferFormGroup.valid) {
      this.dialogRef.close(this.TransferFormGroup.value);
    }
  }

}
