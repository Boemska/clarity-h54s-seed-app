import { Component, OnInit } from '@angular/core';

import H54s from 'h54s';

@Component({
  selector: 'boemska-debug-logs',
  templateUrl: './debug-logs.component.html',
  styleUrls: ['./debug-logs.component.scss']
})
export class DebugLogsComponent implements OnInit {
  public logs: Array<any> = [];

  constructor() { }

  ngOnInit() {
    this.logs = H54s.Logs.get.getDebugData();
  }

}
