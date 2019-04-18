import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { RouterTestingModule } from '@angular/router/testing';

import { UserNavDropdownComponent } from './user-nav-dropdown.component';
import { AdapterService } from '../adapter.service';
import { UserService } from '../user.service';

import H54s from 'h54s';

describe('UserNavDropdownComponent', () => {
  let component: UserNavDropdownComponent;
  let fixture: ComponentFixture<UserNavDropdownComponent>;

  let debugModeEl: DebugElement;
  let headerButtonEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ClarityModule,
        RouterTestingModule
      ],
      declarations: [UserNavDropdownComponent],
      providers: [AdapterService, UserService]
    })
      .compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UserNavDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    debugModeEl = fixture.debugElement.query(By.css('#debug-toggle'));
    headerButtonEl = fixture.debugElement.query(By.css('.boemska-nav-dropdown > .dropdown-toggle'));
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should have 2 way data binding for debug mode', () => {
    expect(component.debugMode).toBe(true);
    debugModeEl.nativeElement.click();
    expect(component.debugMode).toBe(false);
  });

  it('should update debug mode on adapter service', inject([AdapterService], (adapterService: any) => {
    expect(component.debugMode).toBe(true);
    expect(adapterService.debugMode).toBe(true);
    expect(adapterService._adapter.debug).toBe(true);
    debugModeEl.nativeElement.click();
    expect(component.debugMode).toBe(false);
    expect(adapterService.debugMode).toBe(false);
    expect(adapterService._adapter.debug).toBe(false);
  }));

  it('should set user name', inject([AdapterService], async (adapterService: any) => {
    let username = 'user name';
    let headerButtonSpan = headerButtonEl.nativeElement.querySelector('span:first-child');
    spyOn(adapterService._adapter, 'call').and.callFake(function (program: any, tables: any, callback: any) {
      callback(null, {
        userInfo: [{
          USERNAME: username,
        }]
      });
    });

    expect(headerButtonSpan.textContent).toBe('Not logged in');

    await adapterService.call();

    fixture.detectChanges();
    expect(headerButtonSpan.textContent).toBe('user name');
  }));

  it('should have badge next to the user name with correct number', inject([AdapterService], async (adapterService: any) => {

    spyOn(adapterService._adapter, 'call').and.callFake(function (program: any, tables: any, callback: any) {
      callback(null, {});
    });

    // spies will just return some empty objects in arrays
    spyOn(H54s.Logs.get, 'getDebugData').and.callFake(function () {
      return [{}, {}];
    });
    spyOn(H54s.Logs.get, 'getFailedRequests').and.callFake(function () {
      return [{}, {}, {}];
    });

    let badges = headerButtonEl.nativeElement.querySelectorAll('span.badge');
    expect(badges.length).toBe(1);
    expect(badges[0]).toBeTruthy();
    expect(badges[0].classList.contains('hidden')).toBe(true);

    await adapterService.call();

    fixture.detectChanges();

    let badge = headerButtonEl.nativeElement.querySelector('span.badge');
    expect(badge.textContent).toBe('2');

    component.debugMode = false;
    fixture.detectChanges();
    // it's another dom element after debugMode change
    badge = headerButtonEl.nativeElement.querySelector('span.badge');
    expect(badge.textContent).toBe('3');
  }));

});
