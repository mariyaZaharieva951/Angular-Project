import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { matchPasswordsValidator } from '../validators/matchPasswordsValidator';
import { AuthServiceService } from '../auth-service.service';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

    resetPasswordForm: FormGroup;
    token!: string; //tempoprary email token


    constructor(private fb: FormBuilder, private route: ActivatedRoute,private router:Router, private authService: AuthServiceService) {
      this.resetPasswordForm = this.fb.group({
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required]
      }, {
        validators: [ matchPasswordsValidator('newPassword', 'confirmPassword')]
        
      });      

    }

    ngOnInit():void {
      debugger
      this.route.queryParams.subscribe(params => {
        this.token = params['token'];
      });
      

      console.log(this.token)
      if(this.token) {
        this.router.navigate(['auth/action'], {queryParams: {token: this.token}})
      } else {
        console.error('No token for password reset')
      }
    }

      
    
    onSubmit(formDirevtive: FormGroupDirective): void {
      if(this.resetPasswordForm.invalid) {
        return
      }

      const newPassword = this.resetPasswordForm.value.newPassword;
      console.log(newPassword)
      // TODO: handle reset-password request

      

      this.authService.confirmPasswordResetEmail(this.token,newPassword) 
      .then(() => {
        alert('The password is succesfull change!')
      })
      .catch((error:any)=> {
        console.error(error)
      })

      formDirevtive.resetForm();
      this.resetPasswordForm.reset();

    }

}
