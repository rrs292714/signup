import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewpostpageComponent } from './viewpostpage.component';

describe('ViewpostpageComponent', () => {
  let component: ViewpostpageComponent;
  let fixture: ComponentFixture<ViewpostpageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewpostpageComponent]
    });
    fixture = TestBed.createComponent(ViewpostpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
