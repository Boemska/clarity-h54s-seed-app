import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import H54s from 'h54s';

import { Service } from './service.interface';
import { UserService } from './user.service';

import { AdapterSettings } from './h54s.config';

@Injectable()
export class AdapterService {
  public requests: Map<Promise<any>, Service> = new Map();
  public requestsChanged: Subject<null> = new Subject<null>();
  public shouldLogin: Subject<boolean> = new Subject<boolean>();
  private _debugMode: boolean;
  private _adapter: H54s;

  constructor(
    private _userService: UserService
  ) {
    this._adapter = new H54s(AdapterSettings);
    // setting it here to invoke setter method
    this._debugMode = false;
  }

  public login(user: any, pass: any): Promise<number> {
    return new Promise((resolve, reject) => {
      try {
        this._adapter.login(user, pass, (status: any) => {
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

  public call(program: any, tables: any): Promise<any> {
    const promise = new Promise((resolve, reject) => {
      this._adapter.call(program, tables, (err: any, res: any) => {
        if (err) {
          if (err.type === 'notLoggedinError') {
            return this.shouldLogin.next(true);
          } else {
            return reject(err);
          }
        }

        let user = this._userService.user.getValue();
        if (!user && res && res.userInfo && res.userInfo.length > 0) {
          this._userService.user.next({
            username: res.userInfo[0].USERNAME,
            pictureUrl: res.userInfo[0].PICTUREURL
          });
        } else if (!user && res && res.requestingPerson) {
          this._userService.user.next({
            username: res.requestingPerson
          });
        }

        resolve(res);
      });
    });

    this.requests.set(promise, {
      program,
      running: true,
      successful: undefined
    });
    this.requestsChanged.next();

    promise.then(() => {
      let request: any = this.requests.get(promise);
      request.running = false;
      request.successful = true;
      this.requestsChanged.next();
    }).catch(() => {
      let request: any = this.requests.get(promise);
      request.running = false;
      request.successful = false;
      this.requestsChanged.next();
    });

    return promise;
  }

  public logout(): Promise<null | Error> {
    return new Promise((resolve, reject) => {
      this._adapter.logout((errStatus: any) => {
        if (errStatus !== undefined) {
          reject(new Error(`Logout failed with status code ${status}`));
        } else {
          resolve();
          this._userService.user.next(null!);
        }
      });
    });
  }

  public get debugMode() {
    return this._debugMode;
  }

  public set debugMode(debugMode: boolean) {
    this._debugMode = this._adapter.debug = debugMode;
  }

  public createTable(rows: Array<any>, name: string) {
    return new H54s.SasData(rows, name);
  }
}
