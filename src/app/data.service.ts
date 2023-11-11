import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  baseUrl: string = './../assets/db.json';

  tableDataJson: string = './../assets/tableData.json';


  constructor(private httpClient: HttpClient) { }

  getOuNamesList(){
    return this.httpClient.get(this.baseUrl);
  }

  getAllTableData(){
    return this.httpClient.get(this.tableDataJson);
  }


}
