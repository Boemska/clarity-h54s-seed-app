import { Component, OnInit } from '@angular/core';

import H54s from 'h54s';

@Component({
  selector: 'boemska-failed-requests',
  templateUrl: './failed-requests.component.html',
  styleUrls: ['./failed-requests.component.scss']
})
export class FailedRequestsComponent implements OnInit {
  public logs: Array<any> = [];

  constructor() { }

  ngOnInit() {
    this.logs = H54s.Logs.get.getFailedRequests();
  }

}
