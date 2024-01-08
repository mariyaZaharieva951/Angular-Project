import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs';
import { AuthServiceService } from 'src/app/auth/auth-service.service';
import { TranslateService } from '@ngx-translate/core';
import { User } from 'src/app/interfaces/user';
import { TranslationService } from 'src/app/translation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
    currentUser: User | undefined;
    usersList: User[];
    currentUserId: string | null;

    translatedText: string = '';
    originalText: string = 'Products';

  constructor(private translationService: TranslationService,private authService: AuthServiceService, private router: Router, public translate: TranslateService) {
    this.translate.addLangs(['en', 'bg','de']);
    this.translate.setDefaultLang('en');
  
    const saveLang = localStorage.getItem('selectedLang');
    if(saveLang) {
      this.translate.use(saveLang)
    }
  }

  translateTo(targetLanguage: string) {
    debugger
    this.translationService.translateText(this.originalText, targetLanguage)
      .subscribe((response: any) => {
        console.log(response)
        this.translatedText = response[0].translations[0].text;
      }, (error: any) => {
        console.error('Translation failed:', error);
      });
  }

  switchLang(lang: string) {
    this.translate.use(lang);

    localStorage.setItem('selectedLang', lang)
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
