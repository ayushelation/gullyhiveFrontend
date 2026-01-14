// import { Component, Input, Output, EventEmitter } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { AuthService } from '../auth.service';
// import { PLATFORM_ID, Inject } from '@angular/core';
// import { isPlatformBrowser } from '@angular/common';
import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PLATFORM_ID } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-step1-basic-info',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './step1-basic-info.component.html'
})
export class Step1BasicInfoComponent {
  @Input() formData: any;
  @Input() errors: any;
  @Output() inputChange = new EventEmitter<{ field: string, value: any }>();
  @Output() next = new EventEmitter<void>();
  @Output() sendOTP = new EventEmitter<void>();

  profilePreview: string = '';
  fileInputId = 'profile-upload-' + Math.random().toString(36).substring(2);

  parentCategories: any[] = [];
  subCategories: any[] = [];

  professionalTypes = [
    { label: 'Independent Professional', value: 'individual' },
    { label: 'MSME / Agency', value: 'msme' },
    { label: 'Company / Corporate', value: 'company' }
  ];

  constructor(private authService: AuthService,  @Inject(PLATFORM_ID) private platformId: Object) {}

  // ngOnInit() {
  //   // Fetch parent categories
  //   this.authService.getParentCategories().subscribe({
  //     next: (res) => this.parentCategories = res,
  //     error: (err) => console.error('Error fetching parent categories:', err)
  //   });
  // }
  ngOnInit() {
  if (isPlatformBrowser(this.platformId)) {  
    this.authService.getParentCategories().subscribe(res => {
      this.parentCategories = res;
    });
  }
}

  onCategoryChange(categoryId: string) {
  if (!categoryId) return;

  const id = Number(categoryId);

  this.formData.serviceCategoryId = id;
  this.inputChange.emit({ field: 'serviceCategoryId', value: id });

  this.formData.subCategoryIds = [];
  this.subCategories = [];

  this.authService.getSubCategories(id).subscribe(res => {
    this.subCategories = res;
  });
}


  toggleSubCategory(subId: number) {
    if (!this.formData.subCategoryIds) {
      this.formData.subCategoryIds = [];
    }

    const index = this.formData.subCategoryIds.indexOf(subId);

    if (index > -1) {
      this.formData.subCategoryIds.splice(index, 1);
    } else {
      this.formData.subCategoryIds.push(subId);
    }

    // Emit changes
    this.inputChange.emit({ field: 'subCategoryIds', value: this.formData.subCategoryIds });
  }

  // Profile picture & input helpers
  onProfilePictureChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.generatePreview(file);
      this.inputChange.emit({ field: 'profilePicture', value: file });
    } else {
      this.removeProfilePicture();
    }
  }

  removeProfilePicture() {
    this.profilePreview = '';
    this.inputChange.emit({ field: 'profilePicture', value: null });
    const fileInput = document.getElementById(this.fileInputId) as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  }

  private generatePreview(file: File) {
    const reader = new FileReader();
    reader.onloadend = () => this.profilePreview = reader.result as string;
    reader.readAsDataURL(file);
  }

  onInputFieldChange(field: string, value: any) {
    this.inputChange.emit({ field, value });
    if (this.errors[field]) delete this.errors[field];
  }

  onSendOTP() { this.sendOTP.emit(); }
  onNextClick() { this.next.emit(); }
}
