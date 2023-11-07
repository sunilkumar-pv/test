import { Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  jsonData:  any;

  filteredData: any[] = [];
  searchText: any;
  buttonText: string = "Select All";
  multipleOuNameList : any;

  constructor(private dataService: DataService){
    this.dataService.getOuNamesList().subscribe((res: any)=> {
      console.log(res);
      this.jsonData = res;
    });
  }

  toggleAllCheckboxes(): void {
    const allSelected = this.jsonData.every((item: any) => item.selected);
  
    for (let item of this.jsonData) {
      item.selected = !allSelected;
    }
  
    this.buttonText = allSelected ? "Select All" : "Deselect All";
  }
  
  selectMultiOUN(event: any ){
    console.log(event.target.value);
    const selectedNames = [];
    const item = this.jsonData.find((dataItem: any) => dataItem.id === event.target.value);
    if (item) {
      selectedNames.push(item.name);
    }

    this.multipleOuNameList = selectedNames.join(", ");
    console.log("selected", this.multipleOuNameList); 
  }
  

}
