import { Component, OnInit } from '@angular/core';
import { StrollerServiceService } from '../stroller-service.service';
import { Stroller } from 'src/app/interfaces/stroller';
import { map } from 'rxjs/operators';



@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  strollersList: Stroller[] | any;
  searchText: string;
  list: Stroller[] = [];
  filteredList: Stroller[] = this.strollerService.getFilteredStrollers();
  fullStrollersList: Stroller[] | any;

  constructor(private strollerService: StrollerServiceService){

  }

  ngOnInit(): void {

  this.strollerService.getStrollers().valueChanges().subscribe((strollers: Stroller[]) => {
  this.strollersList = strollers;
  //this.fullStrollersList = this.strollersList;
  this.filteredList = [...this.strollersList];

  
  console.log('CATALOG', this.fullStrollersList);
  console.log(this.filteredList.length)
});
    
   
    
  };


  search(): void {
    debugger
    if(!this.searchText.trim()) {
      //this.filteredList = this.fullStrollersList;
      this.filteredList = [...this.strollersList];
    } else {
      this.filteredList = this.strollersList.filter((query: Stroller) => query?.brand.toLowerCase().includes(this.searchText.toLowerCase()));
    }
     //this.strollerService.setFilteredStrollers(this.filteredList);
    
    console.log('AFTER SEARCH', this.filteredList)
    console.log('after',this.filteredList.length)
  }



}

  

