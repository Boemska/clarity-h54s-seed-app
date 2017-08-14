import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LoginComponent } from './login.component';
import { AdapterService } from '../adapter.service';

import * as h54sError from 'h54s/src/error';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let compiled: any;

  let userInput: DebugElement;
  let passInput: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [LoginComponent],
      providers: [AdapterService]
    })
    .compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement;

    userInput = fixture.debugElement.query(By.css('input[name="user"]'));
    passInput = fixture.debugElement.query(By.css('input[name="pass"]'));
  }));

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

  it('Test login', inject([AdapterService], (adapterService) => {
    spyOn(adapterService._adapter, 'login').and.callFake(function (user, pass, callback) {
      callback(200);
    });

    userInput.nativeElement.value = 'username';
    userInput.nativeElement.dispatchEvent(new Event('input'));
    passInput.nativeElement.value = 'password';
    passInput.nativeElement.dispatchEvent(new Event('input'));

    expect(component.data.user).not.toBe(null);
    expect(component.data.pass).not.toBe(null);

    compiled.querySelector('button[type="submit"]').click();

    expect(adapterService._adapter.login).toHaveBeenCalledWith('username', 'password', jasmine.any(Function));
  }));
});
