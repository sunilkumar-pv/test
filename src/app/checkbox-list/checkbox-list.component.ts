// src/app/checkbox-list/checkbox-list.component.ts
import { Component } from '@angular/core';
import { CheckboxService } from './../checkbox.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-checkbox-list',
  templateUrl: './checkbox-list.component.html',
  styleUrls: ['./checkbox-list.component.scss']
})
export class CheckboxListComponent {
  filteredData: any[] = []; 

  selectedCheckboxes = '';
  selectAllButtonText = 'Select All';
  selectAllChecked = false;
  searchText = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;

  jsonData: any;

  constructor(private checkboxService: CheckboxService,
    private dataService: DataService) {
      this.dataService.getOuNamesList().subscribe((res: any)=> {
        // console.log(res);
        this.jsonData = res;
      });
    }

  onPageChange(newPage: number) {
    this.currentPage = newPage;
  }

  toggleSelectAll() {
    const checkboxes = Array.from(
      document.getElementsByName('checkboxName')
    ) as HTMLInputElement[];
    const toggleValue = this.checkboxService.toggleSelectAll(checkboxes);
    this.updateSelectedCheckboxes();
    this.selectAllButtonText = toggleValue ? 'Deselect All' : 'Select All';
    this.selectAllChecked = toggleValue;
  }

  toggleCheckbox(checkboxId: string) {
    this.updateSelectedCheckboxes();
    const checkboxes = Array.from(
      document.getElementsByName('checkboxName')
    ) as HTMLInputElement[];
    this.selectAllChecked = checkboxes.every((checkbox) => checkbox.checked);
  }

  private updateSelectedCheckboxes() {
    const checkboxes = Array.from(
      document.getElementsByName('checkboxName')
    ) as HTMLInputElement[];
    this.selectedCheckboxes = this.checkboxService.updateSelectedCheckboxes(
      checkboxes,
      this.jsonData
    );
  }


 

}
