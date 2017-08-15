import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { AdapterService } from '../adapter.service';

interface User {
  user?: string
  pass?: string
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private _subscription: Subscription;
  public isActive: Boolean;
  public loading: Boolean = false;
  public alertClosed: Boolean = true;
  public errorMsg: String;
  public data: User = {
    user: null,
    pass: null
  };

  constructor(private adapter: AdapterService) { }

  ngOnInit() {
    this._subscription = this.adapter.shouldLogin.subscribe(shouldLogin => {
      this.isActive = shouldLogin;
    });
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  submit() {
    if(this.loading) return;

    this.loading = true;

    this.adapter.login(this.data.user, this.data.pass).then(status => {
      this.loading = false;

      switch(status) {
        case -1:
          this.errorMsg = 'Username or password invalid';
          this.alertClosed = false;
          break;
        case -2:
          this.errorMsg = 'Problem communicating with server';
          this.alertClosed = false;
          break;
        case 200:
          this.errorMsg = null;
          break;
        default:
          this.errorMsg = 'Error with status code ' + status;
          this.alertClosed = false;
      }
    }).catch(err => {
      this.loading = false;
      this.errorMsg = err.message;
      this.alertClosed = false;
      console.error(err);
    });
  }

}
