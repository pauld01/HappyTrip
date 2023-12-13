import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUpdateUserPasswordComponent } from './form-update-user-password.component';

describe('FormUpdateUserPasswordComponent', () => {
  let component: FormUpdateUserPasswordComponent;
  let fixture: ComponentFixture<FormUpdateUserPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormUpdateUserPasswordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormUpdateUserPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
