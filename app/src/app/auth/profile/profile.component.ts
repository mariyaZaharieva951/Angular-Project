import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { UserServiceService } from '../user-service.service';
import { User } from 'src/app/interfaces/user';
import { map } from 'rxjs/operators';
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
  usersList?: User[];
  currentUser: any = [];
  rentArray: Rent[] = [];
  UserData: any = [];

  constructor(public auth: AngularFireAuth, private authService: AuthServiceService, private userService: UserServiceService, public activatedRoute: ActivatedRoute) {
    
  }


  ngOnInit(): void {
    this.retriveUser();
    // this.authService.getUserData()
    // console.log('A',this.authService.getUserData())
   
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
      //console.log(this.currentUser)
      })
  }

  // getUserData() {
  //   //debugger
  //   console.log('USER',this.authService.userData);
  //   this.currentUser = this.authService.userData
  //   return this.authService.userData
  // }
 
  

 
  
}
