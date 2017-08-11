import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingIndicatorComponent } from './loading-indicator/loading-indicator.component';
import { AdapterService } from './adapter.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [LoadingIndicatorComponent],
  exports: [LoadingIndicatorComponent],
  providers: [AdapterService]
})
export class BoemskaModule implements OnInit {

  ngOnInit(): void {
  }

}
