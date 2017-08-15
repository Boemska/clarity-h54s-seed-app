import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from 'clarity-angular';

import { LoadingIndicatorComponent } from './loading-indicator/loading-indicator.component';
import { AdapterService } from './adapter.service';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ClarityModule.forRoot()
  ],
  declarations: [LoadingIndicatorComponent, LoginComponent],
  exports: [LoadingIndicatorComponent, LoginComponent],
  providers: [AdapterService]
})
export class BoemskaModule implements OnInit {

  ngOnInit(): void {
  }

}
