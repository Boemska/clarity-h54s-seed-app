import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { User } from './user.interface';

@Injectable()
export class UserService {
  private _user: User;
  public userChange: Subject<User> = new Subject<User>();

  constructor() { }

  public set user(user) {
    this._user = user;
    this.userChange.next(user);
  }

  public get user() {
    return this._user;
  }

}
