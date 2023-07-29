import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogComponent } from './catalog/catalog.component';
import { StrollerComponent } from './stroller/stroller.component';
import { StollerRoutingModule } from './stoller-routing.module';
import { RouterModule } from '@angular/router';




@NgModule({
  declarations: [
    CatalogComponent,
    StrollerComponent,
  ],
  imports: [
    CommonModule, RouterModule, StollerRoutingModule
  ]
})
export class StrollersModule { }
