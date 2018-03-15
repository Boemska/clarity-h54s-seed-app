import { Component, OnInit } from '@angular/core';

@Component({
  selector: "app-execution",
  templateUrl: "./execution.component.html",
  styleUrls: ["./execution.component.scss"]
})
export class ExecutionComponent implements OnInit {

  public tableFlag: boolean = false;

  constructor() {}
  public showTableSelect() {
    this.tableFlag = !this.tableFlag;
    console.log(this.tableFlag);
  }

  ngOnInit() {}
}
