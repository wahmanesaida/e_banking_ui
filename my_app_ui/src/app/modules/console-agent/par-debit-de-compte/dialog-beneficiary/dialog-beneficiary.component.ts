import { Component, Inject } from '@angular/core';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent, MatDialogModule,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog-beneficiary',
  templateUrl: './dialog-beneficiary.component.html',
  styleUrl: './dialog-beneficiary.component.css'
})

export class DialogBeneficiaryComponent {
  beneficiaryFormGroup: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogBeneficiaryComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.beneficiaryFormGroup = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.beneficiaryFormGroup.valid) {
      this.dialogRef.close(this.beneficiaryFormGroup.value);
    }
  }
}
