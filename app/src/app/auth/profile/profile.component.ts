import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { AngularFireDatabase } from '@angular/fire/compat/database';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  currentUser: User | any;
  haveRentStroller: boolean = false;

  constructor(public afdb: AngularFireDatabase,private authService: AuthServiceService, public activatedRoute: ActivatedRoute) {}


  ngOnInit(): void {
    this.retriveUser();
    
   
  }
  get userEmail(): string {
    return this.authService.userdata?.email
  }


  retriveUser() {  
    const id = this.activatedRoute.snapshot.params['userId'];
    this.authService.getUserData(id).valueChanges().subscribe((val) => {
      if(!val) {
        return
      }
      this.currentUser = val;
      
      if(this.currentUser.rent && this.currentUser.rent[0].brand !== '') {
        this.haveRentStroller = true;
      }
      })
  }

  onDelete(id:string): void {
    
    const userId = this.activatedRoute.snapshot.params['userId'];
    const index = this.currentUser.rent.findIndex((stroller: any) => stroller.id === id);
    
    if(index !== -1) {
      this.currentUser.rent.splice(index,1);
      this.afdb.database.ref('users/' + userId).set(this.currentUser);
      console.log('You successfully delete this stroller');
      
    } else {
      alert('Error')
    }
  }
}
