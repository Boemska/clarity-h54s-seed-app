import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { AdapterService } from '../adapter.service';

@Component({
  selector: 'sas-adapter-loading-indicator',
  templateUrl: './loading-indicator.component.html',
  styleUrls: ['./loading-indicator.component.scss']
})
export class LoadingIndicatorComponent implements OnInit {
  public loading: boolean = false;
  public files: Array<string>;
  private _loadingSub: Subscription;

  constructor(private adapterService: AdapterService) { }

  ngOnInit(): void {
    this._loadingSub = this.adapterService.runningFileNames.subscribe(files => {
      this.files = files;
      this.loading = files.length > 0;
    });
  }

  ngOnDestroy(): void {
    this._loadingSub.unsubscribe();
  }
}
