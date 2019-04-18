import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AdapterService } from '../adapter.service';
import { UserService } from '../user.service';

import H54s from 'h54s';

@Component({
  selector: 'boemska-user-nav-dropdown',
  templateUrl: './user-nav-dropdown.component.html',
  styleUrls: ['./user-nav-dropdown.component.scss']
})

export class UserNavDropdownComponent implements OnInit, OnDestroy {
  public userName: string = 'Not logged in';
  public debugMode: boolean;
  private _reqSub: Subscription = new Subscription;
  private _userSub: Subscription = new Subscription;

  public appLogs: Array<any> = [];
  public debugLogs: Array<any> = [];
  public failedReqs: Array<any> = [];
  public sasErrors: Array<any> = [];

  public requestsCount: number = 0;

  constructor(
    private _userService: UserService,
    private _adapterService: AdapterService
  ) {
    this.debugMode = this._adapterService.debugMode;
  }

  ngOnInit(): void {
    this._reqSub = this._adapterService.requestsChanged.subscribe(() => {
      this.appLogs = H54s.Logs.get.getApplicationLogs();
      this.debugLogs = H54s.Logs.get.getDebugData();
      this.failedReqs = H54s.Logs.get.getFailedRequests();
      this.sasErrors = H54s.Logs.get.getSasErrors();
      this.requestsCount = this.debugLogs.length + this.failedReqs.length;
    });

    this._userSub = this._userService.user.subscribe(user => {
      this.userName = user ? user.username : 'Not logged in';
    });
  }

  ngOnDestroy(): void {
    this._reqSub.unsubscribe();
    this._userSub.unsubscribe();
  }

  onDebugModeChange(): void {
    this._adapterService.debugMode = this.debugMode;
  }

  public onDebugRowClick(evt: Event): void {
    evt.stopPropagation();
  }

  public logout(evt: any): void {
    evt.preventDefault();

    try {
      this._adapterService.logout();
      this._adapterService.shouldLogin.next(true);
    } catch (err) {
      // TODO: handle error - show something to user
      console.error(err);
    }
  }

}
