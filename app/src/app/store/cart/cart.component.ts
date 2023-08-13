import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { User } from 'src/app/interfaces/user';
import { AuthServiceService } from 'src/app/auth/auth-service.service';
import { ActivatedRoute } from '@angular/router';
import { Stroller } from 'src/app/interfaces/stroller';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items: any[] = [];
  haveItems: boolean;

  currentStroller: Stroller;
  currentUser: User | any;
  userId: string;
  strollerId: string;

  constructor(public afdb: AngularFireDatabase,private cartService: CartService, private authService: AuthServiceService) { }

  ngOnInit(): void {
    this.userId = this.authService.userdata?.uid;

    this.authService.getUserData(this.userId).valueChanges().subscribe((val) => {
      if(!val) {
        return
      }
      this.currentUser = val;
      })

    this.items = this.cartService.loadCart()
    
    if(this.items.length > 0) {
      this.haveItems = true;
    } else { this.haveItems = false}
     
  }

  rent(product: any): void {
    this.currentStroller = product
    
    let input = this.currentStroller;
  
    if(input !== undefined) {
      let brand = input?.brand;
      let image = input?.image
      let idS = input.id
      
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
        this.cartService.removeProduct(product)
        
    }
    
  }


  removeItem(product: Stroller): void {
    this.cartService.removeProduct(product);
    this.items = this.cartService.getItems()
    if(this.items.length > 0) {
      this.haveItems = true;
    } else { this.haveItems = false}
 }
}
