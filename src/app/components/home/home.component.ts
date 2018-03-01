import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: object;

  constructor(private userService: UserService, private authService: AuthService) { }

  ngOnInit() {
    this.getUser();
  }

  getUser(): void{

    this.userService
      .getUser()
      .subscribe(
        data => {
          this.user = data;
        },
        error => {
          console.error(error);
        }
      );
  }

  logout(): void{
    console.log('in home logout');
    this.authService.logout().subscribe();
  }

}
