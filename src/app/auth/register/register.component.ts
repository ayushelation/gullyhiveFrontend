
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepIndicatorComponent } from '../step-indicator/step-indicator.component';
import { Step1BasicInfoComponent } from '../step1-basic-info/step1-basic-info.component';
import { Step2LegalIdentityComponent } from '../step2-legal-identity/step2-legal-identity.component';
import { Step3ProfessionalDetailsComponent } from '../step3-professional-details/step3-professional-details.component';
import { OTPVerificationComponent } from '../otp-verification/otp-verification.component';
import { AuthService } from '../auth.service';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    StepIndicatorComponent,
    Step1BasicInfoComponent,
    Step2LegalIdentityComponent,
    Step3ProfessionalDetailsComponent,
      OTPVerificationComponent , 
      
  ],
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  currentStep = 1;

 // showOTP = false;
  submitSuccess = false;
  isSubmitting = false;

  formData: any = {
    fullName: '',
    email: '',
    mobile: '',
    serviceCategory: [],
    coverageArea: '',
    professionalType: '',
    businessName: '',
    registrationType: '',
    registrationNumber: '',
    selfOverview: '',
    skillsBackground: '',
    achievements: '',
     businessAddress: '',
    state: '',
    city: '',
    plotNumber: '',
   pinCode: '',
    role: '',
     password: '',
     registrationDocument: File,
  addressProof: File,
  };

  errors: any = {};

  /* 🔹 FIELD UPDATE */
  // onInputChange(event: { field: string; value: any }) {
  //   this.formData[event.field] = event.value;
  // }

  onInputChange(event: { field: string; value: any }) {
  this.formData[event.field] = event.value;

  // 🔥 CLEAR ERROR AS USER TYPES
  if (this.errors[event.field]) {
    delete this.errors[event.field];
  }
}


  /* 🔹 STEP NAVIGATION */
  goToStep(step: number) {
    this.currentStep = step;
    //this.showOTP = false;
  }
goNextFromStep1() {
  if (this.validateStep1()) {
    this.currentStep = 3; // OTP
  }
}
goNextFromStep3() {
  if (this.validateStep3()) {
    this.currentStep = 4; // OTP
  }
}
goNextFromStep4() {
  if (this.validateStep4()) {
   // this.currentStep = 5; // OTP
  }
}

  /* 🔹 OTP FLOW */
  openOTP() {
    this.currentStep = 2;
  }

  /* OTP VERIFIED */
  onOTPVerified() {
    this.currentStep = 1;
  }


  // ✅ Inject the service here
  constructor(private service: AuthService) { }


submitForm() {
  if (!this.validateStep4()) return;

  this.isSubmitting = true;

  const formData = new FormData();

  // Step 1
  formData.append('FullName', this.formData.fullName || '');
  formData.append('Email', this.formData.email || '');
  formData.append('Mobile', this.formData.mobile || '');
  formData.append('CoverageArea', this.formData.coverageArea || '');
  formData.append('ProfessionalType', this.formData.professionalType || '');
  formData.append('ServiceCategory', JSON.stringify(this.formData.serviceCategory || []));

  // Step 2
  formData.append('BusinessName', this.formData.businessName || '');
  formData.append('RegistrationType', this.formData.registrationType || '');
  formData.append('RegistrationNumber', this.formData.registrationNumber || '');
  formData.append('BusinessAddress', this.formData.businessAddress || '');
  formData.append('State', this.formData.state || '');
  formData.append('City', this.formData.city || '');
  formData.append('PlotNumber', this.formData.plotNumber || '');
  formData.append('PinCode', this.formData.pinCode || '');
  formData.append('Role', this.formData.role || '');
  formData.append('Password', this.formData.password || '');
  if (this.formData.registrationDocument) formData.append('RegistrationDocument', this.formData.registrationDocument);
  if (this.formData.addressProof) formData.append('AddressProof', this.formData.addressProof);

  // Step 3
  formData.append('SelfOverview', this.formData.selfOverview || '');
  formData.append('SkillsBackground', this.formData.skillsBackground || '');
  formData.append('Achievements', this.formData.achievements || '');
  if (this.formData.profilePicture) formData.append('ProfilePicture', this.formData.profilePicture);

  this.service.submitRegistration(formData).subscribe({
    next: res => {
      this.submitSuccess = true;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    error: err => {
      console.error('Full error object:', err);

      if (err.status === 400 && err.error && typeof err.error === 'object') {
        const messages: string[] = [];
        for (const field in err.error) {
          const value = err.error[field];
          if (Array.isArray(value)) {
            messages.push(`${field}: ${value.join(', ')}`);
          } else if (typeof value === 'string') {
            messages.push(`${field}: ${value}`);
          } else if (typeof value === 'object') {
            for (const sub in value) {
              if (Array.isArray(value[sub])) messages.push(`${sub}: ${value[sub].join(', ')}`);
            }
          }
        }
        alert('Validation Errors:\n' + messages.join('\n'));
      } else {
        alert('Error: ' + (err.error?.message || 'Unknown error'));
      }
    },
    complete: () => (this.isSubmitting = false)
  });
}







  validateStep1(): boolean {
  this.errors = {};

  if (!this.formData.fullName?.trim()) {
    this.errors.fullName = 'Full Name is required';
  }

  if (!this.formData.email?.trim()) {
    this.errors.email = 'Email is required';
  } else if (!/^\S+@\S+\.\S+$/.test(this.formData.email)) {
    this.errors.email = 'Enter a valid email';
  }

  if (!this.formData.mobile?.trim()) {
    this.errors.mobile = 'Mobile number is required';
  } else if (!/^\d{10}$/.test(this.formData.mobile)) {
    this.errors.mobile = 'Enter valid 10-digit mobile';
  }

  if (!this.formData.serviceCategory?.length) {
    this.errors.serviceCategory = 'Select at least one service category';
  }

  if (!this.formData.coverageArea?.trim()) {
    this.errors.coverageArea = 'Coverage area is required';
  }

  if (!this.formData.professionalType?.trim()) {
    this.errors.professionalType = 'Select professional type';
  }

  return Object.keys(this.errors).length === 0;
}









 validateStep3(): boolean {
  this.errors = {};
if (!this.formData.businessName?.length) {
    this.errors.businessName = 'Business name required';
  }
  if (!this.formData.registrationType?.length) {
    this.errors.registrationType = 'Select registration type';
  }
  if (!this.formData.registrationNumber?.length) {
    this.errors.registrationNumber = 'Registration number required';
  }
  if (!this.formData.registrationDocument) {
    this.errors.registrationDocument = 'Upload registration document';
  }
  if (!this.formData.addressProof) {
    this.errors.addressProof = 'Upload address proof';
  }
  return Object.keys(this.errors).length === 0;
}

validateStep4(): boolean {
  this.errors = {};

  if (!this.formData.selfOverview || this.formData.selfOverview.trim().length < 50) {
    this.errors.selfOverview = 'Minimum 50 characters required';
  }

  if (!this.formData.skillsBackground || this.formData.skillsBackground.trim().length < 50) {
    this.errors.skillsBackground = 'Minimum 50 characters required';
  }

  return Object.keys(this.errors).length === 0;
}




}
