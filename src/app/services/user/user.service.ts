import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserService {

  private api = '/api/user';

  constructor(private http: Http) { }

  getUser(): Observable<any>{
    return this.http
      .get(
        this.api, 
        { 
          headers: new Headers( { 'Content-Type': 'application/json' })
        }
      )
      .map( res => res.json() )
      .catch( error => Observable.throw( error ) )
  }

}
