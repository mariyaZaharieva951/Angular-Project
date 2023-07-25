import { Injectable } from '@angular/core';
import { Stroller } from '../interfaces/stroller';
import { getDatabase, ref, onValue } from "firebase/database";

import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';



@Injectable({
  providedIn: 'root'
})
export class StrollerServiceService {
 
  private dbPath = '/data';
  strollersRef: AngularFireList<Stroller>

  constructor(public db: AngularFireDatabase) { 
    console.log(db.list)
    this.strollersRef = db.list(this.dbPath);
  }

  getStrollers(): AngularFireList<Stroller> {
    console.log('StrolersRef--->', this.strollersRef)
    return this.strollersRef;
  }

  // getStrollers(query={}): Observable<Stroller[]> {
  //   debugger
  //   const db = getDatabase();
  //   const starCountRef = ref(db, 'data');
  //   console.log(starCountRef);
  //   onValue(starCountRef, (snapshot) => {
  //   const data = snapshot.val();
  //  console.log(data)
  //   });
  //}

  // getStroller() {
  //   const {databaseURL} = environment.firebase;
  //   return this.http.get<Stroller[]>(`${databaseURL}`)
  // }
}
