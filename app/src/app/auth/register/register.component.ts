import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {


  constructor(private authService: AuthServiceService, private router: Router) {}

  register(form: NgForm): void {
    //console.log(form.value)
    if(form.invalid) {
      return
    }
    const {email,password} = form.value;
    this.authService.register(email,password)
    
  }
  
}
