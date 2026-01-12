import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Step3ProfessionalDetailsComponent } from './step3-professional-details.component';

describe('Step3ProfessionalDetailsComponent', () => {
  let component: Step3ProfessionalDetailsComponent;
  let fixture: ComponentFixture<Step3ProfessionalDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Step3ProfessionalDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Step3ProfessionalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
