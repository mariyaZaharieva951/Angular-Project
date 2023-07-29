import { Component, OnInit } from '@angular/core';
import { StrollerServiceService } from '../stroller-service.service';
import { Stroller } from 'src/app/interfaces/stroller';
import { ActivatedRoute } from '@angular/router';
import { AuthServiceService } from 'src/app/auth/auth-service.service';
import { User } from 'src/app/interfaces/user';
import { AngularFireAuth } from '@angular/fire/compat/auth';


export interface Rent {
  name: string;
}

@Component({
  selector: 'app-stroller',
  templateUrl: './stroller.component.html',
  styleUrls: ['./stroller.component.css']
})
export class StrollerComponent implements OnInit {
  // //strollers?: Stroller[];
  currentStroller: Stroller ;
  currentUser: User | undefined;
  rentArray: Rent[] = [];

  

  constructor(private strollerService: StrollerServiceService, private activatedRoute: ActivatedRoute, public auth: AngularFireAuth) {}

  ngOnInit(): void {
    
  this.retriveStrollerByKey();
  
  
  this.auth.user.subscribe((user: any) => this.currentUser = user) //получаваме юзъра от auth firebase
  }
  
   retriveStrollerByKey() {
    
    const id = this.activatedRoute.snapshot.params['strollerId'];
    this.strollerService.getStroller(id).valueChanges().subscribe((val) => {
      if(!val) {
        return
      }
      this.currentStroller = val;
      })
  }
  
  

  add(event: any): void {
    debugger
    let input = this.currentStroller || '';
    if(input !== undefined) {
      let value = input?.brand;
      if(value !== undefined) {
        //console.log(value)
        this.rentArray.push({name: value})
        //console.log('ARRAY',this.rentArray)
      }
    }
    
  }


}


