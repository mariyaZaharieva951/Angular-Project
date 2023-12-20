import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { AuthActivate } from '../shared/guard/guard.guard';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';



const routes: Routes = [
    {
        path: 'auth',
        children: [
          {
            path: 'login',
            component: LoginComponent
          },
          {
            path: 'register',
            component: RegisterComponent
          },
          {
            path: 'profile/:userId',
            component: ProfileComponent,
            //canActivate: [AuthActivate]
          },
          {
            path: 'forgot-password',
            component: ForgotPasswordComponent
          },
          
        ]
    }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule{}