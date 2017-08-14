import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';
import { AdapterService } from '../adapter.service';

import * as h54sError from 'h54s/src/error';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let compiled: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [LoginComponent],
      providers: [AdapterService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('test login component opening', done => {
    inject([AdapterService], async function(adapterService) {
      spyOn(adapterService._adapter, 'call').and.callFake(function(program, tables, callback) {
        callback(new h54sError('notLoggedinError', 'Fake login error'));
      });
      spyOn(adapterService._adapter, 'login').and.callFake(function (user, pass, callback) {
        callback(200);
      });

      var promise = adapterService.call('p1', null);
      fixture.detectChanges();
      expect(component.isActive).toBe(true);

      await adapterService.login('user', 'pass');
      await promise;

      fixture.detectChanges();
      expect(component.isActive).toBe(false);
      done();
    })();
  });

  // it('Test login', done => {
  //   inject([AdapterService], async function (adapterService) {
  //     spyOn(adapterService._adapter, 'login').and.callFake(function (program, tables, callback) {
  //       callback(200);
  //     });

  //     expect(adapterService._adapter.login).toHaveBeenCalled();
  //     done();
  //   })();
  // });
});
