import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import * as h54s from 'h54s';

@Injectable()
export class AdapterService {
  private runningRequests: Map<Promise<any>, string> = new Map();
  public runningFileNames = new Subject<Array<string>>();
  public shouldLogin = new Subject<boolean>();
  private _adapter: h54s;

  constructor() {
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
        resolve(res);
      });
    });

    this.runningRequests.set(promise, program);
    this._update();

    promise.then(() => {
      this.runningRequests.delete(promise);
      this._update();
    });

    return promise;
  }

  private _update(): void {
    this.runningFileNames.next(Array.from(this.runningRequests.values()));
  }

}
