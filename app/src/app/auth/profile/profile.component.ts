import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interfaces/user';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  currentUser: User | any;
  haveRentStroller: boolean = false;

  constructor(private authService: AuthServiceService, public activatedRoute: ActivatedRoute) {}


  ngOnInit(): void {
    this.retriveUser();
    
   
  }
  get userEmail(): string {
    return this.authService.userdata?.email
  }


  retriveUser() {  
    const id = this.activatedRoute.snapshot.params['userId'];
    this.authService.getUserData(id).valueChanges().subscribe((val) => {
      if(!val) {
        return
      }
      this.currentUser = val;
      
      if(this.currentUser.rent && this.currentUser.rent[0].brand !== '') {
        this.haveRentStroller = true;
      }
      })
  }

}
