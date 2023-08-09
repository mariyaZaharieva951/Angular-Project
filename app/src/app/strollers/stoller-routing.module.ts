import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent } from './catalog/catalog.component';
import { StrollerComponent } from './stroller/stroller.component';
import { PageNotFoundComponent } from '../shared/page-not-found/page-not-found.component';
import { AuthActivate } from '../shared/guard/guard.guard';


const routes: Routes = [
    {
        path: 'stroller',
        children: [
          {
            path: 'catalog',
            component: CatalogComponent
          },
          {
            path: ':strollerId',
            component: StrollerComponent,
            //canActivate: [AuthActivate]
          },
        ]
    },
    { path: '**', 
  component: PageNotFoundComponent 
  }
  
];

// @NgModule({
//   imports: [RouterModule.forChild(routes)],
//   exports: [RouterModule]
// })
export const StollerRoutingModule = RouterModule.forChild(routes)