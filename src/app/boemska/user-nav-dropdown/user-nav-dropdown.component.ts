import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AdapterService } from '../adapter.service';
import { UserService } from '../user.service';

import * as adapterLogs from 'h54s/src/logs';

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

  public appLogs: Array<any> = [];
  public debugLogs: Array<any> = [];
  public failedReqs: Array<any> = [];
  public sasErrors: Array<any> = [];

  constructor(private _userService: UserService, private _adapterService: AdapterService) {
    this.debugMode = this._adapterService.debugMode;
  }

  ngOnInit(): void {
    this._reqSub = this._adapterService.requestsChanged.subscribe(() => {
      this.appLogs = adapterLogs.get.getApplicationLogs();
      this.debugLogs = adapterLogs.get.getDebugData();
      this.failedReqs = adapterLogs.get.getFailedRequests();
      this.sasErrors = adapterLogs.get.getSasErrors();
    });

    this._userSub = this._userService.userChange.subscribe(user => {
      this.userName = user.username;
    });
  }

  ngOnDestroy(): void {
    this._reqSub.unsubscribe();
    this._userSub.unsubscribe();
  }

  onDebugModeChange(): void {
    this._adapterService.debugMode = this.debugMode;
  }

}
