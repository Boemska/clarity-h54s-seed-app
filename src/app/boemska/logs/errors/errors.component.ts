import { Component, OnInit } from '@angular/core';

import H54s from 'h54s';

@Component({
  selector: 'boemska-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.scss']
})
export class ErrorsComponent implements OnInit {
  public logs: Array<any> = [];

  constructor() { }

  ngOnInit() {
    this.logs = H54s.Logs.get.getSasErrors();
  }

}
