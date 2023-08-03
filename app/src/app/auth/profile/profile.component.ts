import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { StrollerServiceService } from 'src/app/strollers/stroller-service.service';
import { Stroller } from 'src/app/interfaces/stroller';


export interface Rent {
  brand: string,
  image: string
}


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  rentStroller?: any;
  currentUser: any = [];
  //rentArray: Rent[] = [];

  constructor(public auth: AngularFireAuth, private authService: AuthServiceService, public activatedRoute: ActivatedRoute, private strollerService: StrollerServiceService) {
    
  }


  ngOnInit(): void {
    this.retriveUser();
    
   
  }
  get userEmail(): string {
    return this.authService.userdata?.email
  }

  retriveUser() {  //юзъра от базата
    const id = this.activatedRoute.snapshot.params['userId'];
    this.authService.getUserData(id).valueChanges().subscribe((val) => {
      if(!val) {
        return
      }
      this.currentUser = val;
      })
  }

  
 
  

 
  
}
