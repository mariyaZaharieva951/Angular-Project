import { Injectable, NgZone } from '@angular/core';
import { User } from '../interfaces/user';
import { getDatabase, ref, push, set } from "firebase/database";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import * as auth from 'firebase/auth';
import { Observable, map } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  userdata: any;
  currentUser: Observable<any> | null = null;

  constructor(public afs: AngularFirestore, public auth: AngularFireAuth, public router: Router, public ngZone: NgZone) { 
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

    // this.auth.onAuthStateChanged(user => {
    //   if(user) {
    //     //debugger
    //     this.currentUser = this.afs.doc<any>(`users/${user.uid}`).snapshotChanges().pipe(
    //       map(actions => {
    //         const id = actions.payload.id;
    //         const data = actions.payload.data();
    //         console.log(id, data)
    //         return {id, ...data}
    //       })
    //     )
    //     console.log(this.currentUser)
    //   } else {
    //     this.currentUser = null;
    //   }
    // })


  }


  // getUser() {
  //   console.log(this.currentUser)
  //   return this.currentUser;
  // }
  

  login(email: string,password: string) {
    //debugger;
    return this.auth.signInWithEmailAndPassword(email,password).then((result) => {
      debugger
      this.setUserData(result.user);
      this.auth.authState.subscribe((user) => {
        if(user) {
          debugger
          //this.currentUser = user.
          this.router.navigate(['stroller/catalog'])
        }
      })
    })
    .catch((error) => {
      alert(error.message)
    })
    // const db = getDatabase();
    // set(ref(db, 'users'), {
    //   email: email,
    //   password : password
    // });
    //   alert('user created')
  }

  register(email: string,password: string) {
    //debugger
    //запазване на юзъра в базата данни
      const db = getDatabase();
      const userRef = ref(db, 'users');
      const newUser = push(userRef);
     

    return this.auth.createUserWithEmailAndPassword(email,password).then((result) => {
      //console.log(result.user)
      this.setUserData(result.user);
      
      set(newUser, {
        email: result.user?.email,
        uid: result.user?.uid,
        rent: [''] 
      });
      
      
      this.router.navigate(['stroller/catalog'])
    })
    .catch((error) => {
      alert(error.message)
    })
     
    }

  // sendVerificationMail() {
  //   return this.auth.currentUser.then((user: any) => user.sendVerificationMail()).then(() => {
  //     this.router.navigate(['verify-email-adress']);
  //   })
  // }

  setUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.userId}`);
    const userData: User = {
      email: user.email,
      uid: user.uid,
      rent: []
    };
    return userRef.set(userData, {
      merge: true
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

  

  get userData() {
    //debugger
    //console.log(this.authService.userdata)
    const db = getDatabase();
    const userRef = ref(db, 'users');
    //const user = JSON.parse(localStorage.getItem('user')!);
    console.log(userRef);
    return userRef;
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
