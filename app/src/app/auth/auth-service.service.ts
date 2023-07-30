import { Injectable, NgZone, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { getDatabase, ref, push, set, onValue } from "firebase/database";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

import { Observable, map } from 'rxjs';
import { AngularFireDatabase} from '@angular/fire/compat/database';



@Injectable({
  providedIn: 'root'
})
export class AuthServiceService  {
  userdata: any;
  //currentUser?: User[];

  constructor(public auth: AngularFireAuth, public router: Router, public ngZone: NgZone, public afdb: AngularFireDatabase) { 
    this.auth.authState.subscribe((user) => {
      if(user) {
        //debugger
        this.userdata = user;
        localStorage.setItem('user', JSON.stringify(this.userdata));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!)
      }
    });


  }
  


  login(email: string,password: string) {
    //debugger;
    return this.auth.signInWithEmailAndPassword(email,password).then((result) => {
      debugger
      this.setUserData(result.user?.uid, result.user?.email);
      this.auth.authState.subscribe((user) => {
        if(user) {
          debugger
        
          this.router.navigate(['stroller/catalog'])
        }
      })
    })
    .catch((error) => {
      alert(error.message)
    })
    
  }

  register(email: string,password: string) {
      const db = getDatabase();
      const userRef = ref(db, 'users');
      const newUser = push(userRef);
     
    return this.auth.createUserWithEmailAndPassword(email,password).then((result) => {
    
      this.setUserData(result.user?.uid, result.user?.email);
      
      set(newUser, {
        uid: result.user?.uid,
        email: result.user?.email 
      });
      
      this.router.navigate(['stroller/catalog'])
    })
    .catch((error) => {
      alert(error.message)
    })
     
    }

  setUserData(
    uid: any,
    email: any
  ): void {
    
    const userData: User = {
      email,
      rent: ['']
    };
    this.afdb.database
      .ref('users/' + uid)
      .update(userData)
      .then(() => {
        console.log('User data saved!!!')
      })
      .catch((error) => {
        console.error(error)
      })
  }

  get userId(): string {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user.uid
  }
  
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    //console.log(user)
    if(user){
      return true
    } else {
      return false;
    }
    
  }

  
 getUserData(id: string) {
 
    const data = this.afdb.object('/users/' + id);
    //console.log(data);
    return data;
    
  }

  rentIt() {
    const user = JSON.parse(localStorage.getItem('user')!);
    //console.log(user)
  }

  logout() {
    return this.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate([''])
    })
  }
  
}
