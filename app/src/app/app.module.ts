import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environment/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { HomeComponent } from './home/home.component';
import { CoreModule } from './core/core.module';
import { StrollersModule } from './strollers/strollers.module';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { StoreModule } from './store/store.module';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    CoreModule,
    StrollersModule,
    HttpClientModule,
    SharedModule,
    StoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
