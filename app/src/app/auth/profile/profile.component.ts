import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';


export interface Rent {
  name: string;
}


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  currentUser: any = [];
  rentArray: Rent[] = [];

  constructor(public auth: AngularFireAuth, private authService: AuthServiceService, public activatedRoute: ActivatedRoute) {
    
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
      console.log(this.currentUser);
      })
  }

  
 
  

 
  
}
