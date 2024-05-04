import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {

  @Input() page: number;
  @Input() totalPages: number;
  @Output() nextPage = new EventEmitter<number>();
  @Output() prevPage = new EventEmitter<number>();

  constructor() {}

  onNextPage() {
    this.nextPage.emit(this.page + 1); // Émettre la nouvelle valeur de la page
  }

  onPrevPage() {
    this.prevPage.emit(this.page - 1); // Émettre la nouvelle valeur de la page
  }

}
