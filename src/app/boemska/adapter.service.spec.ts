import { TestBed, inject } from '@angular/core/testing';

import { AdapterService } from './adapter.service';
import { UserService } from './user.service';

import H54s from 'h54s';

describe('AdapterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AdapterService,
        UserService
      ]
    });
  });

  it('should be created', inject([AdapterService], (service: AdapterService) => {
    expect(service).toBeTruthy();
  }));

  it('test login event emit', done => {
    inject([AdapterService], async (service: any) => {
      spyOn(service._adapter, 'call').and.callFake(function (program: any, tables: any, callback: any) {
        callback(H54s.Error('notLoggedinError', 'Fake login error'));
      });
      spyOn(service._adapter, 'login').and.callFake(function (user: any, pass: any, callback: any) {
        callback(200);
      });

      let shouldLogin: any;
      service.shouldLogin.subscribe((val: any) => {
        shouldLogin = val;
      });

      service.call('p', null);
      expect(shouldLogin).toBe(true);
      await service.login('user', 'pass');
      expect(shouldLogin).toBe(false);

      done();
    })();
  });
});
