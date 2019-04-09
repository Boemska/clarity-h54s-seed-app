export = h54s;
declare class h54s {
  static get: any;
  static Error(type: any, message: any, status?: any): void;
  static Files(file: any, macroName: any): void;
  static SasData(data: any, macroName: any, specs?: any): void;
  static Tables(table: any, macroName: any, parameterThreshold: any): void;
  static fromSasDateTime(sasDate: any): any;
  static toSasDateTime(jsDate: any): any;
  static version: string;
  constructor(config: any);
  maxXhrRetries: any;
  url: any;
  debug: any;
  loginUrl: any;
  retryAfterLogin: any;
  ajaxTimeout: any;
  useMultipartFormData: any;
  RESTauth: any;
  RESTauthLoginUrl: any;
  remoteConfigUpdateCallbacks: any;
  call(sasProgram: any, dataObj: any, callback: any, params?: any): void;
  clearAllLogs(): void;
  clearApplicationLogs(): void;
  clearDebugData(): void;
  clearFailedRequests(): void;
  clearSasErrors(): void;
  getApplicationLogs(): any;
  getDebugData(): any;
  getFailedRequests(): any;
  getSasErrors(): any;
  login(user: any, pass: any, callback: any): void;
  logout(callback: any): void;
  onRemoteConfigUpdate(callback: any): void;
  setDebugMode(): void;
  unsetDebugMode(): void;
}
declare namespace h54s {
  namespace Logs {
    function addApplicationLog(message: any, sasProgram: any): void;
    function addDebugData(htmlData: any, debugText: any, sasProgram: any, params: any): void;
    function addFailedRequest(responseText: any, debugText: any, sasProgram: any): void;
    function addSasErrors(errors: any): void;
    namespace clear {
      function clearAllLogs(): void;
      function clearApplicationLogs(): void;
      function clearDebugData(): void;
      function clearFailedRequests(): void;
      function clearSasErrors(): void;
    }
    namespace get {
      function getApplicationLogs(): any;
      function getDebugData(): any;
      function getFailedRequests(): any;
      function getSasErrors(): any;
    }
  }
}
