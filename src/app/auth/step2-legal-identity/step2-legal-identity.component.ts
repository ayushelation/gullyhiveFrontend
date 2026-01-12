import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterFormData } from '../models/register.model';
import { ErrorMessageComponent } from '../error-message-display/error-message-display.component'

@Component({
  selector: 'app-step2-legal-identity',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step2-legal-identity.component.html'
})
export class Step2LegalIdentityComponent {
  @Input() errors: any;
 @Input() formData: any;
//  @Input() formData: RegisterFormData;
  //@Input() errors: Record<string, string> = {};

  @Output() inputChange = new EventEmitter<{ field: string; value: string | File | null }>();
  @Output() next = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();

 
  regDocPreview = '';
  addressProofPreview = '';

  registrationTypes = [
    'GST Registration',
    'Aadhar Card',
    'E-Shram Card',
    'PAN Card'
  ];
   role = [
    'Admin',
    'Seller',
    'Buyer',
  ];

  states = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ];

  onInput(field: string, value: any) {
    this.inputChange.emit({ field, value });
  }

  handleFileChange(field: 'registrationDocument' | 'addressProof', event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0] || null;
    this.onInput(field, file);

    if (!file) {
      field === 'registrationDocument'
        ? this.regDocPreview = ''
        : this.addressProofPreview = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      field === 'registrationDocument'
        ? this.regDocPreview = reader.result as string
        : this.addressProofPreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}
