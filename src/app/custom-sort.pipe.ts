import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customSort'
})
export class CustomSortPipe implements PipeTransform {

  transform(array: any[], sortField: string): any[] {
    if (!array || !sortField) {
      return array;
    }

    return array.slice().sort((a, b) => {
      if (sortField === 'stock' || sortField === 'quantity') {
        return a[sortField] - b[sortField];
      } else if (sortField === 'rating' || sortField === 'price') {
        return a[sortField] - b[sortField];
      } else {
        return 0; // Default case, no sorting
      }
    });
  }

}
