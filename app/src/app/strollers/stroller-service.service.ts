import { Injectable } from '@angular/core';
import { Stroller } from '../interfaces/stroller';

import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { AuthServiceService } from '../auth/auth-service.service';



@Injectable({
  providedIn: 'root'
})
export class StrollerServiceService {
 
  private dbPathData = '/data';
  private dbPathUsers = '/users';
  strollersRef: AngularFireList<Stroller> //Да се провери!!!!
  //stroller: AngularFireObject<any>

  constructor(public db: AngularFireDatabase, private authService: AuthServiceService) { 
    this.strollersRef = db.list(this.dbPathData);
    // this.stroller = db.object('strollerId');
    //   console.log(db.object)
  }

  getStrollers(): AngularFireList<Stroller> {
    return this.strollersRef;
  }

  getStroller(id:string) {
    const data = this.db.object(this.dbPathData + `/${id}`);
   console.log(data)
    return data;
   
  }

  // rentIt() {
  //   console.log(this.authService.userdata)
  // }

  // getUser(id: string) {
  //   debugger
  //   const user = this.db.object(this.dbPathUsers + `/${id}`);
  //   console.log(user);
  //   return user;
  // }

}
