import { Component, OnInit } from '@angular/core';
import { StrollerServiceService } from '../stroller-service.service';
import { Stroller } from 'src/app/interfaces/stroller';
import { ActivatedRoute } from '@angular/router';
import { AuthServiceService } from 'src/app/auth/auth-service.service';
import { User } from 'src/app/interfaces/user';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { AngularFireDatabase } from '@angular/fire/compat/database';



export interface Rent {
  stroller:{ name: string;
  image: string}
}

@Component({
  selector: 'app-stroller',
  templateUrl: './stroller.component.html',
  styleUrls: ['./stroller.component.css']
})
export class StrollerComponent implements OnInit {
  currentStroller: Stroller ;
  currentUser: any = [];
  userId: string
  

  constructor(private authService:AuthServiceService, public afdb: AngularFireDatabase, private strollerService: StrollerServiceService, private activatedRoute: ActivatedRoute, public auth: AngularFireAuth) {}


  ngOnInit(): void {
    
  this.retriveStrollerByKey();
  
  this.userId = this.authService.userdata?.uid;
  
  this.authService.getUserData(this.userId).valueChanges().subscribe((val) => {
    
    if(!val) {
      return
    }
    this.currentUser = val;
    console.log('user',this.currentUser)
    })
  }
  
   retriveStrollerByKey() {
    const id = this.activatedRoute.snapshot.params['strollerId'];
    
    this.strollerService.getStroller(id).valueChanges().subscribe((val) => {
      if(!val) {
        return
      }
      this.currentStroller = val;
      })
  }


  add(event: any): void {
    debugger
    let input = this.currentStroller || '';
  
    if(input !== undefined) {
      let value = input?.brand;
      let image = input?.image
      if(value !== undefined) {
        
        this.currentUser?.rent?.push(value, image)
        
        this.afdb.database.ref('users/' + this.userId).update(this.currentUser);
        
        //console.log('RENT', this.currentUser?.rent) //Да сетна рент датата, трябва да се запазва в базата!!!
        
      }
    }
    
  }


}


