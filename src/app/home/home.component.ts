/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, AfterViewInit } from "@angular/core";

import { AdapterService } from '../boemska/adapter.service';

@Component({
  styleUrls: ['./home.component.scss'],
  templateUrl: './home.component.html',
})
export class HomeComponent implements AfterViewInit {
  constructor(private adapterService: AdapterService) { }

  ngAfterViewInit(): void {
    // call a simple SAS service
    this.adapterService.call('startupService', null).then(res => {
      console.log(res);
    }).catch(err => {
      console.error(err);
    });
  }
}
