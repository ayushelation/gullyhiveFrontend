import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterFormData } from '../models/register.model';
//import { ErrorMessageComponent } from '../error-message-display/error-message-display.component'

@Component({
  selector: 'app-step3-professional-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step3-professional-details.component.html'
})
export class Step3ProfessionalDetailsComponent {
  @Input() errors: any;
 @Input() formData: any;
  //@Input() formData!: RegisterFormData;
  //@Input() errors: Record<string, string> = {};
  @Input() isSubmitting = false;

  @Output() inputChange = new EventEmitter<{ field: string; value: string }>();
  @Output() submit = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();

  onInput(field: string, value: string) {
    this.inputChange.emit({ field, value });
  }
}
