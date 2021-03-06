/* tslint:disable:no-unused-variable */

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HomeComponent } from "./home/home.component";
import { AboutComponent } from "./about/about.component";
import { NotFoundComponent } from './not-found/not-found.component';
import { ClarityModule } from '@clr/angular';
import { ROUTING } from "./app.routing";
import { APP_BASE_HREF } from "@angular/common";

import { BoemskaModule } from './boemska/boemska.module';

describe('AppComponent', () => {

  let fixture: ComponentFixture<any>;
  let compiled: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        AboutComponent,
        HomeComponent,
        NotFoundComponent
      ],
      imports: [
        ClarityModule,
        ROUTING,
        BoemskaModule
      ],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
    });

    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    compiled = fixture.nativeElement;


  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create the app', async(() => {
    expect(compiled).toBeTruthy();
  }));


});
