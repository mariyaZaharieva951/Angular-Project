import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { CartBarComponent } from './cart-bar/cart-bar.component';
import { SearchComponent } from './search/search.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    CartBarComponent,
    SearchComponent
  ],
  imports: [
    CommonModule, RouterModule
  ],
  exports: [HeaderComponent, FooterComponent, CartBarComponent, SearchComponent]
})
export class CoreModule { }
