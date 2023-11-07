import { Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  title = 'test';
  jsonData:  any;

  filteredData: any[] = [];
  searchText: any;
  selectedCheckboxes: string = "";
  selectAllChecked: boolean = false; // Track the state of the "Select All" checkbox

  currentPage: number = 1;
  itemsPerPage: number = 10; // Adjust this as per your preference

  // Handle page change event from pagination component
  onPageChange(page: number): void {
    this.currentPage = page;
  }



  constructor(private dataService: DataService){
    this.dataService.getOuNamesList().subscribe((res: any)=> {
      console.log(res);
      this.jsonData = res;
    });
  }
 
  toggleSelectAll(event: any) {
    const checkboxes = document.getElementsByName('checkboxName');
    for (let i = 0; i < checkboxes.length; i++) {
      const checkbox = checkboxes[i] as HTMLInputElement;
      checkbox.checked = event.target.checked;
    }
    this.updateSelectedCheckboxes();
  }


  toggleCheckbox(checkboxId: string) {
    this.updateSelectedCheckboxes();
    // Check if any of the individual checkboxes are unchecked
    const checkboxes = document.getElementsByName('checkboxName');
    this.selectAllChecked = true;
    for (let i = 0; i < checkboxes.length; i++) {
      const checkbox = checkboxes[i] as HTMLInputElement;
      if (!checkbox.checked) {
        this.selectAllChecked = false;
        break; // No need to continue checking, as we found one unchecked checkbox
      }
    }
  }

  private updateSelectedCheckboxes() {
    const checkboxes = document.getElementsByName('checkboxName');
    const selectedNames = [];
    for (let i = 0; i < checkboxes.length; i++) {
      const checkbox = checkboxes[i] as HTMLInputElement;
      if (checkbox.checked) {
        const itemId = checkbox.value;
        const item = this.jsonData.find((dataItem: any) => dataItem.id === itemId);
        if (item) {
          selectedNames.push(item.name);
        }
      }
    }
    this.selectedCheckboxes = selectedNames.join(", ");
    console.log("selected", this.selectedCheckboxes); 
  }
}
