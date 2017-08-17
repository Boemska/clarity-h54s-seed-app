/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { async, TestBed, ComponentFixture } from "@angular/core/testing";
import { ClarityModule } from 'clarity-angular';
import { HomeComponent } from './home.component';

import { AdapterService } from '../boemska/adapter.service';
import { UserService } from '../boemska/user.service';


describe('HomeComponent', () => {

  let expectedMsg: string = 'This is a Clarity seed application. This is the default page that loads for the application.';

  let fixture: ComponentFixture<any>;
  let compiled: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent
      ],
      imports: [
        ClarityModule.forRoot()
      ],
      providers: [
        AdapterService,
        UserService
      ]
    });

    fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    compiled = fixture.nativeElement;

  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create the home page', async(() => {
    expect(compiled).toBeTruthy();
  }));

  it(`should display: "${expectedMsg}"`, async(() => {
    expect(compiled.querySelector("p").textContent).toMatch(expectedMsg);
  }));


});
