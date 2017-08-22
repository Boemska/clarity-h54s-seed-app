import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import * as h54s from 'h54s';

import { Service } from './service.interface';
import { UserService } from './user.service';

import { AdapterSettings } from './settings';

@Injectable()
export class AdapterService {
  public requests: Map<Promise<any>, Service> = new Map();
  public requestsChanged: Subject<null> = new Subject<null>();
  public shouldLogin: Subject<boolean> = new Subject<boolean>();
  private _debugMode: Boolean;
  private _adapter: h54s;

  constructor(private _userService: UserService) {
    this._adapter = new h54s(AdapterSettings);
    // setting it here to invoke setter method
    this.debugMode = true;
  }

  login(user, pass): Promise<Number> {
    return new Promise((resolve, reject) => {
      try {
        this._adapter.login(user, pass, status => {
          if (status === 200) {
            this.shouldLogin.next(false);
          }
          resolve(status);
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  call(program, tables) {
    const promise = new Promise((resolve, reject) => {
      this._adapter.call(program, tables, (err, res) => {
        if (err) {
          if (err.type === 'notLoggedinError') {
            return this.shouldLogin.next(true);
          } else {
            return reject(err);
          }
        }

        if (!this._userService.user && res && res.userInfo) {
          this._userService.user = {
            username: res.userInfo.USERNAME,
            pictureUrl: res.userInfo.PICTUREURL
          };
        } else if (!this._userService.user && res && res.requestingPerson) {
          this._userService.user = {
            username: res.requestingPerson
          };
        }

        resolve(res);
      });
    });

    this.requests.set(promise, {
      program,
      running: true,
      successful: null
    });
    this.requestsChanged.next();

    promise.then(() => {
      let request = this.requests.get(promise);
      request.running = false;
      request.successful = true;
      this.requestsChanged.next();
    }).catch(() => {
      let request = this.requests.get(promise);
      request.running = false;
      request.successful = false;
      this.requestsChanged.next();
    });

    return promise;
  }

  get debugMode() {
    return this._debugMode;
  }

  set debugMode(debugMode) {
    this._debugMode = this._adapter.debug = debugMode;
  }
}
