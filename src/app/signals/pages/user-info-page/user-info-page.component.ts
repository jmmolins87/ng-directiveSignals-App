import { 
  Component, 
  OnInit, 
  inject, 
  signal 
} from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../interfaces/userRequest.interface';

@Component({
  templateUrl: './user-info-page.component.html',
  styleUrls: ['./user-info-page.component.css']
})
export class UserInfoPageComponent implements OnInit {

  public userId = signal(1);
  public currentUser = signal<User | undefined>( undefined );
  public userWasFound = signal<boolean>( true );

  private _usersService = inject(UsersService);

  constructor( ) {}

  ngOnInit(): void {
    this.loadUser( this.userId() );
  }

  loadUser( id: number ) {

    if( id <= 0 ) return;
    this.userId.set( id );
    this.currentUser.set( undefined );

    this._usersService.getUserById( id )
      .subscribe( user => {
        this.currentUser.set( user );
        this.userWasFound.set( true );
      });

  }

}
