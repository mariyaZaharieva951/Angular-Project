import { Component, OnInit } from '@angular/core';
import { StrollerServiceService } from '../stroller-service.service';
import { Stroller } from 'src/app/interfaces/stroller';
import { ActivatedRoute } from '@angular/router';
import { AuthServiceService } from 'src/app/auth/auth-service.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { User } from 'src/app/interfaces/user';



export interface Rent {
  brand: string,
  image: string,
  id: string
}

@Component({
  selector: 'app-stroller',
  templateUrl: './stroller.component.html',
  styleUrls: ['./stroller.component.css']
})
export class StrollerComponent implements OnInit {
  currentStroller: Stroller ;
  currentUser: User;
  userId: string;
  strollerId: string;
  

  constructor(private authService:AuthServiceService, public afdb: AngularFireDatabase, private strollerService: StrollerServiceService, private activatedRoute: ActivatedRoute, public auth: AngularFireAuth) {}

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  ngOnInit(): void {
    //debugger
  this.retriveStrollerByKey();
  
  this.userId = this.authService.userdata?.uid;
  
 
  // this.authService.getUserData(this.userId).valueChanges().subscribe((val) => {
  //   if(!val) {
  //     return
  //   }
  //   this.currentUser = val;
  //   console.log('User',this.currentUser)
  //   })
  }
  
   retriveStrollerByKey() {
    this.strollerId = this.activatedRoute.snapshot.params['strollerId'];
    
    this.strollerService.getStroller(this.strollerId).valueChanges().subscribe((val) => {
      if(!val) {
        return
      }
      this.currentStroller = val;
      })
  }


  add(event: any): void {
    let input = this.currentStroller;
  
    if(input !== undefined) {
      let brand = input?.brand;
      let image = input?.image
      let idS = this.strollerId
      //debugger
      if(this.currentUser.rent){
        if(this.currentUser.rent[0].brand == "") {
          let id = idS;
          this.currentUser.rent.splice(0,1,{brand, image, id})
        } else {
          let rentStroller = this.currentUser.rent.find(({id}: any) => id === idS);
          if(rentStroller) {
            alert('This stroller is alredy rent for you!')
            return;
          }
          let id = idS;
          this.currentUser?.rent.push({brand, image, id})
        }
      }
        
        
        this.afdb.database.ref('users/' + this.userId).update(this.currentUser);
        
      
    }
    
  }


}


