import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from 'clarity-angular';
import { RouterModule } from '@angular/router';

import { LoadingIndicatorComponent } from './loading-indicator/loading-indicator.component';
import { AdapterService } from './adapter.service';
import { LoginComponent } from './login/login.component';
import { UserService } from './user.service';
import { UserNavDropdownComponent } from './user-nav-dropdown/user-nav-dropdown.component';
import { ApplicationLogsComponent } from './logs/application-logs/application-logs.component';
import { DebugLogsComponent } from './logs/debug-logs/debug-logs.component';
import { FailedRequestsComponent } from './logs/failed-requests/failed-requests.component';
import { ErrorsComponent } from './logs/errors/errors.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ClarityModule.forRoot(),
    RouterModule
  ],
  declarations: [
    LoadingIndicatorComponent,
    LoginComponent,
    UserNavDropdownComponent,
    ApplicationLogsComponent,
    DebugLogsComponent,
    FailedRequestsComponent,
    ErrorsComponent
  ],
  exports: [
    LoadingIndicatorComponent,
    LoginComponent,
    UserNavDropdownComponent,
    ApplicationLogsComponent,
    DebugLogsComponent
  ],
  providers: [AdapterService, UserService]
})
export class BoemskaModule implements OnInit {

  ngOnInit(): void {
  }

}
