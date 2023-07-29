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
  strollersList?: Stroller[];
  //currentStroller?: Stroller;


  constructor(private strollerService: StrollerServiceService){}
  
    
  ngOnInit(): void {
    //debugger
    this.retriveStrollers();

  }

  retriveStrollers(): void {
    this.strollerService.getStrollers().snapshotChanges().pipe(
      map(changes => 
        changes.map(c => 
          ({key: c.payload.key, ...c.payload.val()})))
    ).subscribe(data => {
      this.strollersList = data;
      //console.log(data)
    });
  }
  
    
  
  
}
