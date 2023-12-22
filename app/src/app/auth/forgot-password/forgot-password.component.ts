import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  forgotPasswordForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthServiceService) {

    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    }) 
  }

  onSubmit(formDirevtive: FormGroupDirective):void {

    if(this.forgotPasswordForm.invalid) {
      return
    }

    const email = this.forgotPasswordForm.value.email;
    console.log(email)
    //TODO: handle forgot-password request

    this.authService.sendPasswordResetEmail(email)
    .then( (result) => {
      console.log(result);
      alert('You successful sent email for forgotten password!')
    })
    .catch((error) => {
      console.error('Error', error)
    })

    formDirevtive.resetForm();
    this.forgotPasswordForm.reset();
    
  }

  

}
