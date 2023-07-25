import { Injectable } from '@angular/core';
import { getDatabase, ref, push, set } from "firebase/database";

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor() { }


  login(email: string,password: string) {
    // const db = getDatabase();
    // set(ref(db, 'users'), {
    //   email: email,
    //   password : password
    // });
    //   alert('user created')
  }

  register(email: string,password: string) {
    const db = getDatabase();
    const userRef = ref(db, 'users');
    const newUser = push(userRef);
  set(newUser, {
    email: email,
    password : password
  });
    alert('user created')
  }
}
