interface AlertInterface {
  type: string,
  message: string,
  err?: any,
  closed: boolean
}

export class Alert implements AlertInterface {
  public type: string;
  public message: string;
  public err: any;
  public closed: boolean;

  constructor(
    type: string,
    message: string,
    err?: any
  ) {
    this.type = type;
    this.message = message;
    this.err = err;
    this.closed = false;
  }
}
