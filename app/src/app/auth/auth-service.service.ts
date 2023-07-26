import { Injectable, NgZone } from '@angular/core';
import { User } from '../interfaces/user';
import { getDatabase, ref, push, set } from "firebase/database";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';




@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  userdata: any;

  constructor(public afs: AngularFirestore, public auth: AngularFireAuth, public router: Router, public ngZone: NgZone) { 
    this.auth.authState.subscribe((user) => {
      if(user) {
        this.userdata = user;
        localStorage.setItem('user', JSON.stringify(this.userdata));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!)
      }
    })
  }

  

  login(email: string,password: string) {
    //debugger;
    return this.auth.signInWithEmailAndPassword(email,password).then((result) => {
      this.setUserData(result.user);
      this.auth.authState.subscribe((user) => {
        if(user) {
          
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
    //запазване на юзъра в базата данни
      const db = getDatabase();
      const userRef = ref(db, 'users');
      const newUser = push(userRef);

    
    return this.auth.createUserWithEmailAndPassword(email,password).then((result) => {
      //this.sendVerificationMail();
      //debugger
      console.log(result.user)
      this.setUserData(result.user);
      set(newUser, {
        email: result.user?.email,
        id: result.user?.uid
      });
      
      this.router.navigate(['auth/login'])
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
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      rent: []
    };
    return userRef.set(userData, {
      merge: true
    })
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    if(user && user.emailVerifield){
      return true
    } else {
      return false;
    }
    
  }

  logout() {
    return this.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate([''])
    })
  }
  
}
