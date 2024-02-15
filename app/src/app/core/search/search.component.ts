import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Stroller } from 'src/app/interfaces/stroller';
import { StrollerServiceService } from 'src/app/strollers/stroller-service.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  strollersList: Stroller[] | any;
  fullStrollersList: Stroller[] | any;
  filteredList: Stroller[] = [];
  

   constructor(public strollerService: StrollerServiceService) {}
  

  ngOnInit(): void {
    this.retriveStrollers();
}

retriveStrollers(): void {
  this.strollerService.getStrollers().valueChanges().subscribe((data: Stroller[]) => {
    this.strollersList = data;
    this.fullStrollersList = this.strollersList;
  });
}

search(text: string): void {
  if(!text) {
    this.filteredList = this.fullStrollersList;
  } else {
    this.filteredList = this.fullStrollersList.filter((query: Stroller) => query?.brand.toLowerCase().includes(text.toLowerCase()));
  }
  console.log(this.filteredList);
}
}
