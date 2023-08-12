import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {


  constructor(private authService: AuthServiceService) {}

  register(form: NgForm): void {
    if(form.invalid) {
      return
    }
    const {email,password} = form.value;
    this.authService.register(email,password)
    
  }
  
}
