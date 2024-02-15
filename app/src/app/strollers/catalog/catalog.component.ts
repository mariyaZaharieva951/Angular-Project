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

  constructor(private strollerService: StrollerServiceService){

  }

  ngOnInit(): void {

    this.strollerService.getStrollers().valueChanges().subscribe((strollers: Stroller[]) => {
      this.strollersList = strollers;
      
      this.filteredList = [...this.strollersList];
   
    
  });



}

  
  
    
  
  
}
