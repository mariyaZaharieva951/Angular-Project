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
  currentUser: User | undefined;
  rentArray: Rent[] = [];
  UserData: any = [];

  constructor(public auth: AngularFireAuth, private authService: AuthServiceService, private userService: UserServiceService, public activatedRoute: ActivatedRoute) {
    
  }


  ngOnInit(): void {
   
   
  }
  get userEmail(): string {
    //мога да взема UID
    //console.log(this.authService.userdata.uid)
    return this.authService.userdata?.email
  }

 
  

 
  
}
