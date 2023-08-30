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
  list: Stroller[] = [];
  filteredList: Stroller[] = [];
  //@Input() stroller!: Stroller;
  

   constructor(public strollerService: StrollerServiceService) {}
  

  ngOnInit(): void {
    this.retriveStrollers();
}

  retriveStrollers(): void {
    //debugger
    this.strollerService.getStrollers().snapshotChanges().pipe(
      map(changes => 
        changes.map(c => 
          ({key: c.payload.key, ...c.payload.val()})))
    ).subscribe(data => {
      this.strollersList = data;
      this.list = this.strollersList;
    });
  }
  
  search(text: string): void {
    debugger
    if(!text) {
      this.list = this.strollersList;
      }
      if(this.strollersList){
      
    }
    
     this.filteredList = this.list.filter(
        query => query?.brand.toLowerCase().includes(text.toLowerCase())
      );
      console.log(this.filteredList)
}

}
