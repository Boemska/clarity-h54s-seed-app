import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from 'clarity-angular';

import { LoadingIndicatorComponent } from './loading-indicator/loading-indicator.component';
import { AdapterService } from './adapter.service';
import { LoginComponent } from './login/login.component';
import { UserService } from './user.service';
import { UserNavDropdownComponent } from './user-nav-dropdown/user-nav-dropdown.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ClarityModule.forRoot()
  ],
  declarations: [
    LoadingIndicatorComponent,
    LoginComponent,
    UserNavDropdownComponent
  ],
  exports: [
    LoadingIndicatorComponent,
    LoginComponent,
    UserNavDropdownComponent
  ],
  providers: [AdapterService, UserService]
})
export class BoemskaModule implements OnInit {

  ngOnInit(): void {
  }

}
