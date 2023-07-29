import { Injectable } from '@angular/core';
import { getDatabase, ref, push, set } from "firebase/database";
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { User } from '../interfaces/user';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  

  constructor(public db: AngularFireDatabase, public activatedRoute: ActivatedRoute, public auth: AngularFireAuth) { 
   
  }

  // get userData() {
  //   //debugger
  //   //console.log(this.authService.userdata)
  //   const db = getDatabase();
  //   console.log(db)
  //   db.ref('users/' + this.auth.currentUser.)
  //   const user = JSON.parse(localStorage.getItem('user')!);
  //   console.log(user);
  //   return user;
  // }

  
 

  
}
