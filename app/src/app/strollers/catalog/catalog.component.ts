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
  list: Stroller[] = [];
  filteredList: Stroller[] = [];
  searchText: any;

  constructor(private strollerService: StrollerServiceService){

  }



    
  ngOnInit(): void {
    this.retriveStrollers();
    
  }

  retriveStrollers(): void {
    
    this.strollerService.getStrollers().snapshotChanges().pipe(
      map(changes => 
        changes.map(c => 
          ({key: c.payload.key, ...c.payload.val()})))
    ).subscribe(data => {
      this.strollersList = data;
      //console.log(this.strollersList)
      this.list = this.strollersList;
      console.log('Filtered',this.filteredList)
    });
  }

  search(text: string): void {
    debugger
    if(!text) {
      this.list = this.strollersList;
      }
    
     this.filteredList = this.list.filter(
        query => query?.brand.toLowerCase().includes(text.toLowerCase())
      );
      console.log('Filtered Search',this.filteredList)
}

  

  
  
    
  
  
}
