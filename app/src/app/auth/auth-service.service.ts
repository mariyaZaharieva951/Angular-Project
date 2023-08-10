import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AngularFireDatabase} from '@angular/fire/compat/database';



@Injectable({
  providedIn: 'root'
})
export class AuthServiceService  {
  userdata: any;

  constructor(public auth: AngularFireAuth, public router: Router, public afdb: AngularFireDatabase) { 
    this.auth.authState.subscribe((user) => {
      if(user) {
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
    return this.auth.signInWithEmailAndPassword(email,password).then((result) => {
      //this.setUserData(result.user?.uid, result.user?.email);
      this.auth.authState.subscribe((user) => {
        if(user) {
          this.router.navigate(['stroller/catalog'])
        }
      })
    })
    .catch((error) => {
      alert(error.message)
    })
    
  }

  register(email: string,password: string) {
     
    return this.auth.createUserWithEmailAndPassword(email,password).then((result) => {
    
      this.setUserData(result.user?.uid, result.user?.email);
      
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
    debugger
    const userData: User = {
      email,
      rent: [{brand:"", image:"", id: ""}]
    };
    this.afdb.database
      .ref('users/' + uid)
      .update(userData)
      .then(() => {
        console.log('User data saved!')
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
    if(user){
      return true
    } else {
      return false;
    }
    
  }

  
 getUserData(id: string) {
    const data = this.afdb.object('/users/' + id);
    return data;
  }


  logout() {
    return this.auth.signOut().then(() => {
      localStorage.removeItem('user');
      localStorage.removeItem('cart_items')
      this.router.navigate([''])
    })
  }
  
}
