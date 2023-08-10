import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Stroller } from '../interfaces/stroller';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: Stroller[] = [];
  

  constructor(public afdb: AngularFireDatabase) {}


  addToCart(product: Stroller) {
    this.items.push(product);
    this.saveCart(); 
  }

  saveCart() {
    localStorage.setItem('cart_items', JSON.stringify(this.items))
  }

  
  getItems() {
    return this.items;
  }

  loadCart() {
    this.items = JSON.parse(localStorage.getItem('cart_items') as any) || [];
    return this.items
  }

  productInCart(product: any) {
    return this.items.findIndex((x: any) => x.id === product.id) > -1;
  }

  removeProduct(product: any) {
    const index = this.items.findIndex((x: any) => x.id === product.id)
      if(index > -1) {
        this.items.splice(index,1);
        this.saveCart();
      }

  }

  // clearCart() {
  //   localStorage.clear();
  //   this.items = [];
  //   return this.items;
  // }

  // getData() { 
  //   const data = this.afdb.object('/data');
  //   return data;
    
  // }
}