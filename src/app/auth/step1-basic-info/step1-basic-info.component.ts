import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//import { ErrorMessageComponent } from '../error-message-display/error-message-display.component'

@Component({
  selector: 'app-step1-basic-info',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './step1-basic-info.component.html'
})
export class Step1BasicInfoComponent {
  @Input() formData: any;
  @Input() errors: any;
  @Output() inputChange = new EventEmitter<{field: string, value: any}>();
  @Output() next = new EventEmitter<void>();
  @Output() sendOTP = new EventEmitter<void>();
  

  profilePreview: string = '';
  fileInputId = 'profile-upload-' + Math.random().toString(36).substring(2);

  serviceCategories = [
    'Home Cleaning & Housekeeping',
    'Repairs & Maintenance',
    'Appliance Repair & Service',
    'Painting & Home Improvement',
    'Pest Control',
    'Packers & Movers',
    'Beauty & Grooming at Home',
    'Home Health & Elderly Care',
    'Interior & Renovation',
    'Home Security & Smart Devices',
    'Vehicle Services',
    'Professional Services'
  ];

  // professionalTypes = [
  //   'Independent Professional',
  //   'Agency',
  //   'Corporate',
  //   'Freelancer'
  // ];
  professionalTypes = [
  { label: 'Independent Professional', value: 'individual' },
  { label: 'MSME / Agency', value: 'msme' },
  { label: 'Company / Corporate', value: 'company' }
];



  ngOnChanges(): void {
    if (this.formData?.profilePicture && this.formData.profilePicture instanceof File) {
      this.generatePreview(this.formData.profilePicture);
    } else if (!this.formData?.profilePicture) {
      this.profilePreview = '';
    }
  }

  onServiceCategoryChange(category: string): void {
    const currentCategories = [...(this.formData?.serviceCategory || [])];
    const index = currentCategories.indexOf(category);
    
    if (index === -1) {
      currentCategories.push(category);
    } else {
      currentCategories.splice(index, 1);
    }
    
    this.inputChange.emit({ field: 'serviceCategory', value: currentCategories });
  }

  onProfilePictureChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      if (!file.type.startsWith('image/')) { alert('Please upload an image file'); return; }
      if (file.size > 5 * 1024 * 1024) { alert('Max 5MB'); return; }
      this.generatePreview(file);
      this.inputChange.emit({ field: 'profilePicture', value: file });
    } else {
      this.removeProfilePicture();
    }
  }

  removeProfilePicture(): void {
    this.profilePreview = '';
    this.inputChange.emit({ field: 'profilePicture', value: null });
    const fileInput = document.getElementById(this.fileInputId) as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  }

  private generatePreview(file: File): void {
    const reader = new FileReader();
    reader.onloadend = () => this.profilePreview = reader.result as string;
    reader.readAsDataURL(file);
  }

  onInputFieldChange(field: string, value: string): void {
    this.inputChange.emit({ field, value });


 // Remove error for this field while typing
     if (this.errors[field]) {
      delete this.errors[field];
    }
  }

 onSendOTP() {
    // if (!this.formData.mobile || this.formData.mobile.length !== 10) {
    //   alert('Enter valid mobile number');
    //   return;
    // }
    this.sendOTP.emit();
  }



 /** Validate form fields */
  // validateForm(): boolean {
  //   this.errors = {}; // reset previous errors

  //   if (!this.formData.fullName?.trim()) {
  //     this.errors.fullName = 'Full Name is required';
  //   }

  //   if (!this.formData.email?.trim()) {
  //     this.errors.email = 'Email is required';
  //   } else if (!/^\S+@\S+\.\S+$/.test(this.formData.email)) {
  //     this.errors.email = 'Enter a valid email';
  //   }

  //   if (!this.formData.mobile?.trim()) {
  //     this.errors.mobile = 'Mobile number is required';
  //   } else if (!/^\d{10}$/.test(this.formData.mobile)) {
  //     this.errors.mobile = 'Enter a valid 10-digit mobile number';
  //   }

  //   if (!this.formData.serviceCategory?.length) {
  //     this.errors.serviceCategory = 'Select at least one service category';
  //   }

  //   if (!this.formData.coverageArea?.trim()) {
  //     this.errors.coverageArea = 'Coverage area is required';
  //   }

  //   if (!this.formData.professionalType?.trim()) {
  //     this.errors.professionalType = 'Select a professional type';
  //   }

  //   // Return true if no errors
  //   return Object.keys(this.errors).length === 0;
  // }

  // onNextClick(): void {
  //   if (this.validateForm()) {
  //     this.next.emit();
  //   } else {
  //     console.log('Form validation failed', this.errors);
  //   }
  // }


  onNextClick(): void {
    this.next.emit();
  }
  

}
