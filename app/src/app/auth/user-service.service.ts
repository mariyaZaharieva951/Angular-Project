import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { User } from '../interfaces/user';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
 
  private dbPathUsers = 'users';
  

  constructor(public db: AngularFireDatabase, public activatedRoute: ActivatedRoute, private http: HttpClient) { 
   
  }



  
 

  
}
