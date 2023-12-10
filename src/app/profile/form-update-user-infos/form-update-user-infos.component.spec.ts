import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUpdateUserInfosComponent } from './form-update-user-infos.component';

describe('FormUpdateUserInfosComponent', () => {
  let component: FormUpdateUserInfosComponent;
  let fixture: ComponentFixture<FormUpdateUserInfosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormUpdateUserInfosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormUpdateUserInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
