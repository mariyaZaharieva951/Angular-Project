import { Component, OnInit } from '@angular/core';
import { StrollerServiceService } from '../stroller-service.service';
import { Stroller } from 'src/app/interfaces/stroller';
import { ActivatedRoute } from '@angular/router';
import { AuthServiceService } from 'src/app/auth/auth-service.service';
import { CartService } from 'src/app/store/cart.service';



// export interface Rent {
//   brand: string,
//   image: string,
//   id: string
// }

@Component({
  selector: 'app-stroller',
  templateUrl: './stroller.component.html',
  styleUrls: ['./stroller.component.css']
})
export class StrollerComponent implements OnInit {
  items: any[] = [];
  currentStroller: Stroller;
  strollerId: string;
  

  constructor(private authService:AuthServiceService, private strollerService: StrollerServiceService, private activatedRoute: ActivatedRoute, private cartService: CartService) {}

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  
  ngOnInit(): void {

  this.retriveStrollerByKey();
  
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

  addToCart(product: Stroller): void {
    if(this.cartService.productInCart(product)) {
      window.alert('This product alredy in your shipping cart!');
      return
    }
    this.cartService.addToCart(product);
    window.alert('Your product has been added to the cart!');
  }

  
}


