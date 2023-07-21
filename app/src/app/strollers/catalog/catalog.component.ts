import { Component, OnInit } from '@angular/core';
import { StrollerServiceService } from '../stroller-service.service';
import { Stroller } from 'src/app/interfaces/stroller';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {
  strollersList: Stroller[] = [];

  constructor(private strollerService: StrollerServiceService) {

  }

  ngOnInit(): void {
    
    console.log(this.strollerService.getStrollers())

    this.strollerService.getStrollers().subscribe({
      next: (strollers) => {
        this.strollersList = strollers;
        console.log(strollers)
      }
    })
  }
}
