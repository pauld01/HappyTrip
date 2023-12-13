import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectExtrasComponent } from './select-extras.component';

describe('SelectExtrasComponent', () => {
  let component: SelectExtrasComponent;
  let fixture: ComponentFixture<SelectExtrasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectExtrasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectExtrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
