import { Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  jsonData:  any;  
  searchText: any;
 
  currentPage: number = 1;
  itemsPerPage: number = 10;

  selectAllButtonText: string = "Select All";
 
  filteredData: any[] = []; 
  selectedCheckboxes: string = "";
  selectAllChecked: boolean = false; // Track the state of the "Select All" checkbox

  constructor(private dataService: DataService){
    this.dataService.getOuNamesList().subscribe((res: any)=> {
      // console.log(res);
      this.jsonData = res;
    });
  }


  onPageChange(newPage: number) {
    this.currentPage = newPage;
  }
 

  toggleSelectAll() {
    const checkboxes = document.getElementsByName('checkboxName');
    const anyUnchecked = Array.from(checkboxes).some((checkbox) => !(checkbox as HTMLInputElement).checked);
  
    for (let i = 0; i < checkboxes.length; i++) {
      const checkbox = checkboxes[i] as HTMLInputElement;
      checkbox.checked = anyUnchecked;
    }
  
    this.updateSelectedCheckboxes(); 
  
    // Toggle the button text
    this.selectAllButtonText = anyUnchecked ? "Deselect All" : "Select All";
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
    // console.log(typeof(this.selectedCheckboxes));
    // console.log("selected", this.selectedCheckboxes); 
  }


}
