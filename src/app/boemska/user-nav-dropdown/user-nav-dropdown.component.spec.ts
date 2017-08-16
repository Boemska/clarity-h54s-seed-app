import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ClarityModule } from 'clarity-angular';
import { RouterTestingModule } from '@angular/router/testing';

import { UserNavDropdownComponent } from './user-nav-dropdown.component';
import { AdapterService } from '../adapter.service';
import { UserService } from '../user.service';

import * as adapterLogs from 'h54s/src/logs';

describe('UserNavDropdownComponent', () => {
  let component: UserNavDropdownComponent;
  let fixture: ComponentFixture<UserNavDropdownComponent>;

  let debugModeEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ClarityModule.forChild(),
        RouterTestingModule
      ],
      declarations: [UserNavDropdownComponent],
      providers: [AdapterService, UserService,]
    })
      .compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UserNavDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    debugModeEl = fixture.debugElement.query(By.css('#debug-toggle'));
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should have 2 way data binding for debug mode', () => {
    expect(component.debugMode).toBe(true);
    debugModeEl.nativeElement.click();
    expect(component.debugMode).toBe(false);
  });

  it('should update debug mode on adapter service', inject([AdapterService], adapterService => {
    expect(component.debugMode).toBe(true);
    expect(adapterService.debugMode).toBe(true);
    expect(adapterService._adapter.debug).toBe(true);
    debugModeEl.nativeElement.click();
    expect(component.debugMode).toBe(false);
    expect(adapterService.debugMode).toBe(false);
    expect(adapterService._adapter.debug).toBe(false);
  }));

  // TODO: test username is set after adapter service call method

});
