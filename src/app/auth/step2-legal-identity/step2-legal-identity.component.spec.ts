import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Step2LegalIdentityComponent } from './step2-legal-identity.component';

describe('Step2LegalIdentityComponent', () => {
  let component: Step2LegalIdentityComponent;
  let fixture: ComponentFixture<Step2LegalIdentityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Step2LegalIdentityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Step2LegalIdentityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
