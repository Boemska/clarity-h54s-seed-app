import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import * as h54s from 'h54s';

import { Service } from './service.interface';
import { UserService } from './user.service';

@Injectable()
export class AdapterService {
  public requests: Map<Promise<any>, Service> = new Map();
  public requestsChanged: Subject<null> = new Subject<null>();
  public shouldLogin: Subject<boolean> = new Subject<boolean>();
  private _adapter: h54s;

  constructor(private _userService: UserService) {
    this._adapter = new h54s({
      hostUrl: 'https://apps.boemskats.com/'
    });
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
    var promise = new Promise((resolve, reject) => {
      this._adapter.call(program, tables, (err, res) => {
        if(err) {
          if (err.type === 'notLoggedinError') {
            return this.shouldLogin.next(true);
          } else {
            return reject(err);
          }
        }

        if(!this._userService.user && res.userInfo) {
          this._userService.user = {
            username: res.userInfo.USERNAME,
            pictureUrl: res.userInfo.PICTUREURL
          };
        } else if (!this._userService.user && res.requestingPerson) {
          this._userService.user = {
            username: res.requestingPerson
          };
        }

        resolve(res);
      });
    });

    this.requests.set(promise, {
      program,
      running: true
    });
    this.requestsChanged.next();

    promise.then(() => {
      this.requests.get(promise).running = false;
      this.requestsChanged.next();
    }).catch(() => {
      this.requests.get(promise).running = false;
      this.requestsChanged.next();
    });

    return promise;
  }
}
