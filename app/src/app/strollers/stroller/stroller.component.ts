import { Component, OnInit } from '@angular/core';
import { StrollerServiceService } from '../stroller-service.service';
import { Stroller } from 'src/app/interfaces/stroller';
import { ActivatedRoute } from '@angular/router';
import { AuthServiceService } from 'src/app/auth/auth-service.service';
import { User } from 'src/app/interfaces/user';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, onAuthStateChanged } from "firebase/auth";



export interface Rent {
  name: string;
}

@Component({
  selector: 'app-stroller',
  templateUrl: './stroller.component.html',
  styleUrls: ['./stroller.component.css']
})
export class StrollerComponent implements OnInit {
  currentStroller: Stroller ;
  currentUser: any = [];
  rentArray: Rent[] = [];
  userId: string
  

  

  constructor(private authService:AuthServiceService,private strollerService: StrollerServiceService, private activatedRoute: ActivatedRoute, public auth: AngularFireAuth) {
    // this.auth.authState.subscribe((user) => {
    //   debugger
    //   if(user) {
    //     this.currentUser = user;
    //     this.userId = JSON.stringify(this.currentUser.uid)
    //     console.log('CURRENT', JSON.stringify(this.currentUser))
    //   } else {

    //   }
    // });
    }


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
      if(value !== undefined) {
        
        this.currentUser?.rent?.push(value)
        
        console.log(this.currentUser)
        console.log('RENT', this.currentUser?.rent) 
        //this.rentArray.push({name: value})
        //console.log('ARRAY',this.rentArray)
      }
    }
    
  }

  // updateUserData(){
  //   var userNow = firebase.auth().currentUser;
  //     userNow.updateProfile({
  //     displayName: "Jane Q. User",
  //     photoURL: "https://example.com/jane-q-user/profile.jpg"
  //   }).then(function() {
  //     var displayName = userNow.displayName;
  //     var photoURL = userNow.photoURL;
  //   }, function(error) {
  //     console.log(error)
  //   });
//}


}


