import { Component, OnInit } from '@angular/core';
import { StrollerServiceService } from '../stroller-service.service';
import { Stroller } from 'src/app/interfaces/stroller';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-stroller',
  templateUrl: './stroller.component.html',
  styleUrls: ['./stroller.component.css']
})
export class StrollerComponent implements OnInit {
  // //strollers?: Stroller[];
  currentStroller: Stroller | undefined;

  constructor(private strollerService: StrollerServiceService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    
  this.retriveStrollerByKey();
   
  }
  
   retriveStrollerByKey() {
    const id = this.activatedRoute.snapshot.params['strollerId'];
    this.strollerService.getStroller(id).valueChanges().subscribe((val) => {
      if(!val) {
        return
      }
      console.log(val)
      this.currentStroller = val;
      })
  }
  




}


