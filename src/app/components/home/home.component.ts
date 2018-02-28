import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: object;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUser();
  }

  getUser(): void{

    this.userService
      .getUser()
      .subscribe(
        data => {
          console.info(data);
          this.user = data;
        },
        error => {
          console.error(error);
        }
      )
  }

}
