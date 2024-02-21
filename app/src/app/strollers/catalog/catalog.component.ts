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
  filteredList: Stroller[] = this.strollerService.getFilteredStrollers();

  constructor(private strollerService: StrollerServiceService){

  }

  ngOnInit(): void {

  this.strollerService.getStrollers().valueChanges().subscribe((strollers: Stroller[]) => {
  this.strollersList = strollers;
  this.filteredList = [...this.strollersList];

});
     
  };


  search(): void {
    if(!this.searchText.trim()) {
      this.filteredList = [...this.strollersList];
    } else {
      this.filteredList = this.strollersList.filter((query: Stroller) => query?.brand.toLowerCase().includes(this.searchText.toLowerCase()));
    }
    this.strollerService.setFilteredStrollers(this.filteredList);
  }

}

  

