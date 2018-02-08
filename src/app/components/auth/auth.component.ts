import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { DOCUMENT } from '@angular/platform-browser';
import * as config from '../../../../config.json';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private authService: AuthService, @Inject(DOCUMENT) private document: any){}

  ngOnInit() {
    this.document.location = `http://localhost:${(<any>config).PORT}/auth/login`;
  }

}
