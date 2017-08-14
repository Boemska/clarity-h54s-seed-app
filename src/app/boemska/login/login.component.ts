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
  public isActive: boolean;
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
    this.adapter.login(this.data.user, this.data.pass).then(status => {

    }).catch(err => {
      console.error(err);
    });
  }

}
