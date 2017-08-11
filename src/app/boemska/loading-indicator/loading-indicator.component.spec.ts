import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { LoadingIndicatorComponent } from './loading-indicator.component';
import { AdapterService } from '../adapter.service';

describe('LoadingIndicatorComponent', () => {
  let component: LoadingIndicatorComponent;
  let fixture: ComponentFixture<LoadingIndicatorComponent>;
  let adapterService: AdapterService;

  let compiled: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoadingIndicatorComponent],
      providers: [AdapterService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
    expect(compiled).toBeTruthy();
  });

  it('should not be displayed by default', () => {
    expect(compiled.querySelector(".loading-indicator").style.display).toMatch('none');
  });

  it('should show/hide and hold the list of the files', done => {
    inject([AdapterService], (adapterService) => {
      spyOn(adapterService._adapter, 'call').and.callFake(function(program, tables, callback) {
        setTimeout(callback, ~~(Math.random() * 100));
      });
      var promise1 = adapterService.call('p1', null);
      var promise2 = adapterService.call('p2', null);
      fixture.detectChanges();
      expect(component.loading).toBe(true);
      expect(component.files.length).toBe(2);
      expect(compiled.querySelector(".loading-indicator").style.display).toMatch('block');
      Promise.all([promise1, promise2]).then(() => {
        fixture.detectChanges();
        expect(component.loading).toBe(false);
        expect(component.files.length).toBe(0);
        expect(compiled.querySelector(".loading-indicator").style.display).toMatch('none');
        done();
      })
    })();
  });
});
