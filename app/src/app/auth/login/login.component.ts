import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authService: AuthServiceService) {}

  login(form: NgForm): void {
    if(form.invalid) {
      return
    }
    const {email,password} = form.value;
    this.authService.login(email,password)
  }
}
