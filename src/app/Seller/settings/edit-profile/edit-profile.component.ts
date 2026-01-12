// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-edit-profile',
//   templateUrl: './edit-profile.component.html',
//   styleUrls: ['./edit-profile.component.css']
// })
// export class EditProfileComponent {
//   showUserMenu = false;
//   profileImage: string | ArrayBuffer | null = null;

//   editForm: FormGroup;

//   constructor(private fb: FormBuilder, private router: Router) {
//     this.editForm = this.fb.group({
//       firstName: ['John', Validators.required],
//       lastName: ['Doe', Validators.required],
//       email: ['john.doe@example.com', [Validators.required, Validators.email]],
//       phone: ['+1 (555) 123-4567', Validators.required],
//       bio: ['Experienced professional with over 10 years in the service industry. Committed to delivering high-quality work and excellent customer satisfaction.'],
//       address: ['123 Main Street', Validators.required],
//       city: ['New York', Validators.required],
//       state: ['NY', Validators.required],
//       zipCode: ['10001', Validators.required],
//       website: ['www.johndoe.com'],
//       linkedin: ['linkedin.com/in/johndoe']
//     });
//   }

//   toggleUserMenu() {
//     this.showUserMenu = !this.showUserMenu;
//   }

//   onImageSelected(event: any) {
//     const file = event.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => this.profileImage = reader.result;
//       reader.readAsDataURL(file);
//     }
//   }

//   onSubmit() {
//     if (this.editForm.valid) {
//       console.log(this.editForm.value);
//       alert('Profile updated successfully!');
//       // Here you can call an API to save the data
//     }
//   }

//   cancel() {
//     this.router.navigate(['/seller/settings']);
//   }
// }


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

  onImageSelected(event: any) {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => this.profileImage = reader.result;
      reader.readAsDataURL(file);
    }
  }

  // onSubmit() {
  //   if (this.editForm.valid) {
  //     console.log('Updated profile:', this.editForm.value);
  //     alert('Profile updated successfully!');
  //     // Here you can call your API to save the updated data
  //   }
  // }
  onSubmit() {
  if (this.editForm.invalid) return;

  const form = this.editForm.value;

  const payload = {
    displayName: `${form.firstName} ${form.lastName}`.trim(),
    email: form.email,
    phone: form.phone,
    description: form.description,

    addressLine1: form.address,
    city: form.city,
    state: form.state,
    pincode: form.pincode
  };

  this.sellerService.updateProfile(this.sellerId, payload).subscribe({
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


  cancel() {
    this.router.navigate(['/seller/settings']);
  }
}

