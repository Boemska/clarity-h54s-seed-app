import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ClarityModule } from '@clr/angular';

import { LoginComponent } from './login.component';
import { AdapterService } from '../adapter.service';
import { UserService } from '../user.service';

import  H54s from 'h54s';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let compiled: any;

  let userInput: DebugElement;
  let passInput: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ClarityModule
      ],
      declarations: [LoginComponent],
      providers: [AdapterService, UserService]
    })
    .compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;

    fixture.detectChanges();

    userInput = fixture.debugElement.query(By.css('input[name="user"]'));
    passInput = fixture.debugElement.query(By.css('input[name="pass"]'));
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('test login component opening', done => {
    inject([AdapterService], async function(adapterService: any) {
      spyOn(adapterService._adapter, 'call').and.callFake(function(program: any, tables: any, callback: any) {
        callback(H54s.Error('notLoggedinError', 'Fake login error'));
      });
      spyOn(adapterService._adapter, 'login').and.callFake(function (user: any, pass: any, callback: any) {
        callback(200);
      });

      const promise = adapterService.call('p1', null);
      expect(component.isActive).toBe(true);

      await adapterService.login('user', 'pass');

      expect(component.isActive).toBe(false);
      done();
    })();
  });

  it('Test login', inject([AdapterService], (adapterService: any) => {
    spyOn(adapterService._adapter, 'login').and.callFake(function (user: any, pass: any, callback: any) {
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
