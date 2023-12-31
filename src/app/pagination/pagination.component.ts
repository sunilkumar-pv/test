import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
})
export class PaginationComponent {
  @Input() get itemsPerPageValue(): number {
    return this._itemsPerPageValue;
  }
  set itemsPerPageValue(value: number) {
    this._itemsPerPageValue = value;
    this.pageChange.emit(1); // Reset to the first page when changing items per page
  }
  private _itemsPerPageValue!: number;

  @Input() currentPage!: number;
  @Input() totalItems!: number;

  @Output() pageChange: EventEmitter<number> = new EventEmitter();

  getTotalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPageValue);
  }

  nextPage(): void {
    if (this.currentPage < this.getTotalPages()) {
      this.pageChange.emit(this.currentPage + 1);
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.pageChange.emit(this.currentPage - 1);
    }
  }

  getPages(): number[] {
    const totalPages = this.getTotalPages();
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.getTotalPages()) {
      this.pageChange.emit(page);
    }
  }
}
