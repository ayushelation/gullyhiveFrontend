// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { OtpVerificationComponent } from '../otp-verification/otp-verification.component';

// describe('OtpVerificationComponent', () => {
//   let component: OtpVerificationComponent;
//   let fixture: ComponentFixture<OtpVerificationComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [OtpVerificationComponent]
//     })
//     .compileComponents();

//     fixture = TestBed.createComponent(OtpVerificationComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OTPVerificationComponent } from '../otp-verification/otp-verification.component';

describe('OTPVerificationComponent', () => {
  let component: OTPVerificationComponent;
  let fixture: ComponentFixture<OTPVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OTPVerificationComponent] // standalone component
    }).compileComponents();

    fixture = TestBed.createComponent(OTPVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
