import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ClarityModule } from 'clarity-angular';

import { UserNavDropdownComponent } from './user-nav-dropdown.component';
import { UserService } from '../user.service';

describe('UserNavDropdownComponent', () => {
  let component: UserNavDropdownComponent;
  let fixture: ComponentFixture<UserNavDropdownComponent>;

  let debugModeEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ClarityModule.forChild()
      ],
      declarations: [UserNavDropdownComponent],
      providers: [UserService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserNavDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    debugModeEl = fixture.debugElement.query(By.css('#debug-toggle'));
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should have 2 way data binding for debug mode', () => {
    expect(component.debugMode).toBe(false);
    debugModeEl.nativeElement.click();
    expect(component.debugMode).toBe(true);
  });
});
