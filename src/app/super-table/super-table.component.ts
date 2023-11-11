import { Component, ElementRef, ViewChild } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-super-table',
  templateUrl: './super-table.component.html',
  styleUrls: ['./super-table.component.scss']
})
export class SuperTableComponent {
  tableData: any;
  products: any;
 
  selectedSortColumn: string = ''; // Added a variable to store the selected column for sorting
  selectedSortOrder: 'asc' | 'desc' = 'asc'; // Default sorting order
  columnHeaders : any = [];
  columnVisibility: boolean[] = []; // New array to track column visibility
 
  constructor(private dataService: DataService){
    this.dataService.getAllTableData().subscribe((res: any)=> {
      console.log(res);
      this.tableData = res;
      this.products = res;

      this.columnHeaders  = Object.keys(res[0]);  
    });

  }
  

  doSort(event: any) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    // Now you have the selected value, extract the necessary information and perform the sorting
    const column = selectedValue.split('-')[0]; // Extract 'price' or 'rating'
    const sortOrder = selectedValue.split('-')[1] || 'asc'; // Extract 'asc' or 'desc', default to 'asc' if not present

    // Perform the sorting
    // this.products = this.sortArray(this.products, column, sortOrder);
    this.products = this.sortArray(this.products, column, sortOrder as 'asc' | 'desc');

  }

  private sortArray(arr: any[], column: string, order: 'asc' | 'desc' = 'asc'): any[] {
    return arr.sort((a, b) => {
      const valA = this.getValueForSorting(a[column]);
      const valB = this.getValueForSorting(b[column]);

      if (valA < valB) {
        return order === 'asc' ? -1 : 1;
      } else if (valA > valB) {
        return order === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });
  }

  private getValueForSorting(value: any): any {
    if (typeof value === 'string') {
      return value.toLowerCase();
    } else if (typeof value === 'number') {
      return value;
    } else {
      return '';
    }
  }


  doToggleForColumns(val: any) {
    const selectedColumn = (val.target as HTMLSelectElement).value;
    console.log(selectedColumn);
  }

 
 

}





