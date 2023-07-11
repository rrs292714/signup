import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileformComponent } from './profileform.component';

describe('ProfileformComponent', () => {
  let component: ProfileformComponent;
  let fixture: ComponentFixture<ProfileformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileformComponent]
    });
    fixture = TestBed.createComponent(ProfileformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
