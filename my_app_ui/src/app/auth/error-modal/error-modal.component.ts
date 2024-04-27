import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrl: './error-modal.component.css'
})
export class ErrorModalComponent {

  @Input() errorMessage: string;
  @Input() showErrorModal: boolean;
  @Output() tryAgain: EventEmitter<void> = new EventEmitter<void>();

  onClose() {
    this.showErrorModal = false;
  }

  onTryAgain() {
    this.tryAgain.emit();
  }


}
