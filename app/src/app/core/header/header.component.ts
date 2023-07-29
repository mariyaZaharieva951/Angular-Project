import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs';
import { AuthServiceService } from 'src/app/auth/auth-service.service';
import { UserServiceService } from 'src/app/auth/user-service.service';
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

  constructor(private authService: AuthServiceService, private router: Router, private userService: UserServiceService) {

  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  get userId() { 
    this.currentUserId = this.authService.userId
    
    return this.authService.userId
  }
  


//   getCurrentUserData(){
//     return new Observable(obs => {
//       this.db.list('/active')
//       .filter(p => p.userID === "oiV0Q09hLbWv0nhFUeFd94aWF3f1")
//       .valueChanges()
//       .subscribe(res => {
//          console.log(res)
//      })
//    });
// }

  

  ngOnInit(): void {
    

   
  } 

  

  

  logout() {
    this.authService.logout()
    this.router.navigate(['/auth/login']);
    
  }
}
