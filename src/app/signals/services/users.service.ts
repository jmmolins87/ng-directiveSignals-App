import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { SingleUserRequest, User } from '../interfaces/userRequest.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private _http = inject( HttpClient );
  private baseUrl: string = 'https://reqres.in/api/users';

  constructor() { }

  getUserById( id: number ): Observable<User> {
    return this._http.get<SingleUserRequest>( `${ this.baseUrl }/${ id }` )
      .pipe(
        map( response => response.data )
      );
  }
}
