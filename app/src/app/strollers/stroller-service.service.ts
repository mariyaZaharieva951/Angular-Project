import { Injectable } from '@angular/core';
import { Stroller } from '../interfaces/stroller';

import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';



@Injectable({
  providedIn: 'root'
})
export class StrollerServiceService {
 
  private dbPath = '/data';
  strollersRef: AngularFireList<Stroller>
  //stroller: AngularFireObject<any>

  constructor(public db: AngularFireDatabase) { 
    this.strollersRef = db.list(this.dbPath);
    // this.stroller = db.object('strollerId');
    //   console.log(db.object)
  }

  getStrollers(): AngularFireList<Stroller> {
    return this.strollersRef;
  }

  getStroller(id:string) {
    const data = this.db.object(this.dbPath + `/${id}`);
    return data;
   
  }


}
