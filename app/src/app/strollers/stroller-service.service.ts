import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environment/environment';
import { Stroller } from '../interfaces/stroller';

@Injectable({
  providedIn: 'root'
})
export class StrollerServiceService {

  constructor(private http: HttpClient) { }

  getStrollers() {
    //debugger
    const {databaseURL} = environment.firebase;
    return this.http.get<Stroller[]>(`${databaseURL}`)
  }
}
