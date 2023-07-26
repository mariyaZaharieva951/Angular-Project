import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/auth/auth-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {


  constructor(private authService: AuthServiceService, private router: Router) {

  }
  logout() {

    this.authService.logout()
    // .subscribe({
    //   next: () => {
    this.router.navigate(['/auth/login']);
    //   },
    //   error: () => {
    //     this.router.navigate(['/auth/login']);
    //   },
    // });
  }
}
