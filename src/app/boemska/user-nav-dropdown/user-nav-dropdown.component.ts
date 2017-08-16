import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AdapterService } from '../adapter.service';
import { UserService } from '../user.service';

@Component({
  selector: 'boemska-user-nav-dropdown',
  templateUrl: './user-nav-dropdown.component.html',
  styleUrls: ['./user-nav-dropdown.component.scss']
})
export class UserNavDropdownComponent implements OnInit {
  public userName: String = 'Not logged in';
  public debugMode: Boolean;
  private _reqSub: Subscription;
  private _userSub: Subscription;

  constructor(private _userService: UserService, private _adapterService: AdapterService) { }

  ngOnInit(): void {
    this._reqSub = this._adapterService.requestsChanged.subscribe(() => {
      // TODO: update logs
    });

    this._userSub = this._userService.userChange.subscribe(user => {
      this.userName = user.username;
    });
  }

  ngOnDestroy(): void {
    this._reqSub.unsubscribe();
    this._userSub.unsubscribe();
  }

}
