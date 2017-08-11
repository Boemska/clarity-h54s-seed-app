import { TestBed, inject } from '@angular/core/testing';

import { AdapterService } from './adapter.service';

import * as h54sError from 'h54s/src/error';

describe('AdapterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdapterService]
    });
  });

  it('should be created', inject([AdapterService], (service: AdapterService) => {
    expect(service).toBeTruthy();
  }));

  it('test login event emit', inject([AdapterService], (service) => {
    spyOn(service._adapter, 'call').and.callFake(function(program, tables, callback) {
      callback(null, new h54sError('loginError', 'Fake login error'));
    });
  }));
});
