import { Component, OnInit } from '@angular/core';
import { StrollerServiceService } from '../stroller-service.service';
import { Stroller } from 'src/app/interfaces/stroller';



@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  strollersList: Stroller[] | any;
  searchText: string;
  filteredList: Stroller[] = this.strollerService.getFilteredStrollers();

  paginatedData: any[];
  currentPage: number = 1;
  itemsPerPage: number = 3;
  totalPages?: number;
   
  constructor(private strollerService: StrollerServiceService){

  }

  ngOnInit(): void {

  this.strollerService.getStrollers().valueChanges().subscribe((strollers: Stroller[]) => {
  this.strollersList = strollers;

  this.filteredList = [...this.strollersList];
  this.fetchData();
    
});
    
  };


  search(): void {
    if(!this.searchText.trim()) {
      this.filteredList = [...this.strollersList];
    } else {
      this.filteredList = this.strollersList.filter((query: Stroller) => query?.brand.toLowerCase().includes(this.searchText.toLowerCase()));
    }
    this.strollerService.setFilteredStrollers(this.filteredList);
    this.fetchData();
  }


  fetchData(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedData = this.filteredList.slice(startIndex, endIndex);
    this.totalPages = Math.ceil(this.filteredList.length / this.itemsPerPage);
  }


  nextPage(): void {
    if (this.currentPage < this.totalPages!) {
      this.currentPage++;
      this.fetchData();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchData();
    }
  }
}

  

