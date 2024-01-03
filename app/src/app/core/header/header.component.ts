import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs';
import { AuthServiceService } from 'src/app/auth/auth-service.service';
import { TranslateService } from '@ngx-translate/core';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
    currentUser: User | undefined;
    usersList: User[];
    currentUserId: string | null;

  constructor(private authService: AuthServiceService, private router: Router, public translate: TranslateService) {
    this.translate.addLangs(['en', 'bg','de']);
    this.translate.setDefaultLang('en');
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  get userId() { 
    this.currentUserId = this.authService.userId
    
    return this.authService.userId
  }
  

  ngOnInit(): void {
    
  } 


  logout() {
    this.authService.logout()
    this.router.navigate(['/auth/login']);
    
  }
}
