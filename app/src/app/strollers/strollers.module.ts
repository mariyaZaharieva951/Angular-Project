import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CatalogComponent } from './catalog/catalog.component';
import { StrollerComponent } from './stroller/stroller.component';
import { StollerRoutingModule } from './stoller-routing.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}


@NgModule({
  declarations: [
    CatalogComponent,
    StrollerComponent,
  ],
  imports: [
    CommonModule, RouterModule, StollerRoutingModule, SharedModule, CoreModule, FormsModule,
    TranslateModule.forChild({
      defaultLanguage: 'en', 
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ]
})
export class StrollersModule { }
