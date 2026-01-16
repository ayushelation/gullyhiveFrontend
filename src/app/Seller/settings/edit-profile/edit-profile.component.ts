

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SellerService, PublicProfile } from '../../seller.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  showUserMenu = false;
  profileImage: string | ArrayBuffer | null = null;
  editForm: FormGroup;
  sellerId!: number;
  loading = true;
  profile!: PublicProfile;
  previewImage: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private sellerService: SellerService
  ) {
    this.editForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
     // bio: [''],
      address: [''],
      city: [''],
      state: [''],
      description: [''],
    //  zipCode: [''],
      website: [''],
      linkedin: [''],
      pincode: ['']
    });
  }

  ngOnInit(): void {
    // Get seller ID from route params
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.sellerId = +id;
        this.loadProfile(this.sellerId);
      } else {
        this.loading = false;
      }
    });
  }

  loadProfile(sellerId: number) {
    this.loading = true;
    this.sellerService.getPublicProfile(sellerId).subscribe({
      next: (data) => {
        if (data) {
          this.profile = data;

          // Pre-fill form with profile data
          const names = data.displayName?.split(' ') || [];
          this.editForm.patchValue({
            firstName: names[0] || '',
            lastName: names.slice(1).join(' ') || '',
            email: data.email || '',
            phone: data.phone || '',
            description: data.description || '',
            pincode: data.pincode || '',
            address: data.addressLine1 ?? '',
            city: data.addressCity ?? data.baseCity ?? '',
            state: data.state ?? '',
          });

          this.loading = false;
        }
      },
      error: (err) => {
        console.error('Failed to load profile', err);
        this.loading = false;
      }
    });
  }

  toggleUserMenu() {
    this.showUserMenu = !this.showUserMenu;
  }

  // onImageSelected(event: any) {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = () => this.profileImage = reader.result;
  //     reader.readAsDataURL(file);
  //   }
  // }
  onImageSelected(event: any) {
  const file = event.target.files?.[0];
  if (file) {
    // Show preview
    const reader = new FileReader();
    reader.onload = () => (this.previewImage = reader.result);
    reader.readAsDataURL(file);

    // Save file to send to backend
    this.selectedFile = file;
  }
}
selectedFile: File | null = null;

//   onSubmit() {
//   if (this.editForm.invalid) return;

//   const form = this.editForm.value;

//   const payload = {
//     displayName: `${form.firstName} ${form.lastName}`.trim(),
//     email: form.email,
//     phone: form.phone,
//     description: form.description,

//     addressLine1: form.address,
//     city: form.city,
//     state: form.state,
//     pincode: form.pincode
//   };
//     // Add profile image if selected
//   if (this.selectedFile) {
//     formData.append('ProfilePicture', this.selectedFile);
//   }

//   this.sellerService.updateProfile(this.sellerId, payload).subscribe({
//     next: () => {
//       alert('Profile updated successfully!');
//       this.router.navigate(['/seller/settings']);
//     },
//     error: (err) => {
//       console.error('Update failed', err);
//       alert('Failed to update profile');
//     }
//   });
// }

onSubmit() {
  if (this.editForm.invalid) return;

  const form = this.editForm.value;

  // Create FormData instead of payload object
  const formData = new FormData();

  formData.append('DisplayName', `${form.firstName} ${form.lastName}`.trim());
  formData.append('Email', form.email);
  formData.append('Phone', form.phone);
  formData.append('Description', form.description);
  formData.append('AddressLine1', form.address);
  formData.append('City', form.city);
  formData.append('State', form.state);
  formData.append('Pincode', form.pincode);

  // Add profile image if selected
  if (this.selectedFile) {
    formData.append('ProfilePicture', this.selectedFile);
  }

  // Send FormData to backend
  this.sellerService.updateProfile(this.sellerId, formData).subscribe({
    next: () => {
      alert('Profile updated successfully!');
      this.router.navigate(['/seller/settings']);
    },
    error: (err) => {
      console.error('Update failed', err);
      alert('Failed to update profile');
    }
  });
}


 getInitials(name: string): string {
    return name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : '';
  }
  cancel() {
    this.router.navigate(['/seller/settings']);
  }
}

