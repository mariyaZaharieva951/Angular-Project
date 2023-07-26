import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authService: AuthServiceService, private router: Router) {}

  login(form: NgForm): void {
    //debugger;
    //console.log(form.value);
    if(form.invalid) {
      return
    }
    const {email,password} = form.value;
    this.authService.login(email,password)
  }
}
