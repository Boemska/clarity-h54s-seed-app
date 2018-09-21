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
  constructor(private _adapterService: AdapterService) { }

  async ngAfterViewInit() {
    // call a simple SAS service
    try {
      const res = await this._adapterService.call('sample/sampleCall', null);
      console.log(res);
    } catch(err) {
      // TODO: handle error
      console.log(err);
    }
    
  }
}
