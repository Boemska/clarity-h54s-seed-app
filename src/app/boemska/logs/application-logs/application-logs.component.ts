import { Component, OnInit } from '@angular/core';

import H54s from 'h54s';

@Component({
  selector: 'boemska-application-logs',
  templateUrl: './application-logs.component.html',
  styleUrls: ['./application-logs.component.scss']
})
export class ApplicationLogsComponent implements OnInit {
  public logs: Array<any> = [];

  constructor(  ) { }

  ngOnInit() {
    this.logs = H54s.Logs.get.getApplicationLogs();
  }

}
