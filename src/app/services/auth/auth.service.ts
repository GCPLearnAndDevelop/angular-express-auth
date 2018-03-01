import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthService {

  private api = '/auth/logout';

  constructor(private http: Http) { }

  logout(): Observable<any>{
    // console.log('logout')
    return this.http.get( this.api );
  }

}
