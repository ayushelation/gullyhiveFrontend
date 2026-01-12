import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitHandlerComponent } from './submit-handler.component.component';

describe('SubmitHandlerComponentComponent', () => {
  let component: SubmitHandlerComponent;
  let fixture: ComponentFixture<SubmitHandlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmitHandlerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmitHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
