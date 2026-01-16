

import { Component, OnInit } from '@angular/core';
import { SellerService,  ProviderService, ProviderServicesResponse } from '../seller.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: any;
   sellerId!: number;

  constructor(private sellerService: SellerService) {}

  // ngOnInit(): void {
  //   this.loadDashboardData();
  // }
totalLeads = 0;
totalResponses = 0;
acceptedResponses = 0;
pendingResponses = 0;

ngOnInit() {
   this.loadDashboardData();
  // Load leads
  this.sellerService.getLeads().subscribe(leads => {
    this.totalLeads = leads.length;
  });

  // Load responses
  this.sellerService.getMyResponses(this.sellerId).subscribe(res => {
    const responses = res.data;
    this.totalResponses = responses.length;
    this.acceptedResponses = responses.filter(r => r.status === 'accepted').length;
    this.pendingResponses = responses.filter(r => r.status === 'pending').length;
  });





   // Load dashboard
    this.sellerService.getDashboardData().subscribe(d => {
      this.user = d;
      this.sellerId = d.sellerId;

      // Load services
      this.loadProviderServices(this.sellerId);
    });

    // Load categories & cities
    this.sellerService.getParentCategories().subscribe(res => this.parentCategories = res);
    this.sellerService.getCities().subscribe(res => this.cities = res);
}

  loadDashboardData(): void {
    this.sellerService.getDashboardData().subscribe({
      next: dashboard => {
        console.log('Dashboard data:', dashboard);
        this.user = dashboard; // 👈 STORE FULL DASHBOARD
      },
      error: err => console.error('Failed to load dashboard data', err)
    });
  }





  // Services
  services: { categoryId: number; subCategoryIds: number[] }[] = [];
  selectedCategory: number | null = null;
  selectedSubCategory: number | null = null;

  // Dropdown options
  parentCategories: any[] = [];
  subCategories: any[] = [];
  cities: any[] = [];

  // Service area
  serviceArea: {
    type: 'city' | 'radius' | 'pincode' | '';
    cityId?: number;
    radiusKm?: number;
    pincodes: string[];
  } = { type: '', pincodes: [] };

  pincodeInput = '';
  showServicesModal = false;


 
onCategoryChange(categoryId: number, fetchSub = true) {
  this.selectedCategory = categoryId;

  if (fetchSub) {
    this.subCategories = [];
    this.sellerService.getSubCategories(categoryId).subscribe(res => this.subCategories = res);
  }

  // Pre-check subcategories if editing
  const service = this.services.find(s => s.categoryId === categoryId);
  this.selectedSubCategory = service?.subCategoryIds[0] || null;
}

toggleSubCategory(subId: number) {
  if (!this.selectedCategory) return;

  let service = this.services.find(s => s.categoryId === this.selectedCategory);
  if (!service) {
    service = { categoryId: this.selectedCategory, subCategoryIds: [] };
    this.services.push(service);
  }

  const index = service.subCategoryIds.indexOf(subId);
  if (index > -1) service.subCategoryIds.splice(index, 1);
  else service.subCategoryIds.push(subId);
}
addPincode() {
  if (this.pincodeInput && !this.serviceArea.pincodes.includes(this.pincodeInput)) {
    this.serviceArea.pincodes.push(this.pincodeInput);
    this.pincodeInput = '';
  }
}

removePincode(index: number) {
  this.serviceArea.pincodes.splice(index, 1);
}
addService() {
  if (this.selectedCategory && this.selectedSubCategory) {
    let service = this.services.find(s => s.categoryId === this.selectedCategory);
    if (!service) {
      service = { categoryId: this.selectedCategory, subCategoryIds: [] };
      this.services.push(service);
    }

    if (!service.subCategoryIds.includes(this.selectedSubCategory)) {
      service.subCategoryIds.push(this.selectedSubCategory);
    }

    // Reset selection
    this.selectedCategory = null;
    this.selectedSubCategory = null;
  }
}

removeService(index: number) {
  this.services.splice(index, 1);
}


loadProviderServices(providerId: number) {
  this.sellerService.getProviderServices(providerId)
    .subscribe((data: ProviderServicesResponse) => {
      // Map API data to component format
      this.services = data.services.map((s: ProviderService) => ({
        categoryId: s.categoryId,
        subCategoryIds: s.subCategoryIds
      }));

      // Load service area
      if (data.serviceArea) {
        this.serviceArea = {
          type: data.serviceArea.type,
          cityId: data.serviceArea.cityId,
          radiusKm: data.serviceArea.radiusKm,
          pincodes: data.serviceArea.pincodes || []
        };
      }

      // Populate subcategories for first category (dropdown)
      if (this.services.length > 0) {
        this.onCategoryChange(this.services[0].categoryId, false);
      }
    });
}

// dashboard.component.ts

// Get category name from ID safely
getCategoryName(categoryId: number): string {
  const cat = this.parentCategories.find(c => c.id === categoryId);
  return cat ? cat.name : '';
}

// Check if a subcategory is selected for a category
isSubCategorySelected(categoryId: number | null, subId: number): boolean {
  if (!categoryId) return false;
  const service = this.services.find(s => s.categoryId === categoryId);
  return service ? service.subCategoryIds.includes(subId) : false;
}
getSubCategoryName(subId: number): string {
  const sub = this.subCategories.find(sc => sc.id === subId);
  return sub ? sub.name : '';
}

// Returns a comma-separated string of subcategory names for a service
getSubCategoryNames(service: { categoryId: number; subCategoryIds: number[] }): string {
  if (!service || !service.subCategoryIds) return '';
  return service.subCategoryIds
    .map(subId => this.getSubCategoryName(subId)) // call the existing helper
    .join(', ');
}

// Inside DashboardComponent
openEditServices() {
  if (!this.sellerId) return;

  // Fetch current services for this seller
  this.sellerService.getProviderServices(this.sellerId).subscribe({
    next: (data) => {
      // Map API data to component format
      this.services = data.services.map((s: ProviderService) => ({
        categoryId: s.categoryId,
        subCategoryIds: s.subCategoryIds
      }));

      // Map service area
      if (data.serviceArea) {
        this.serviceArea = {
          type: data.serviceArea.type,
          cityId: data.serviceArea.cityId,
          radiusKm: data.serviceArea.radiusKm,
          pincodes: data.serviceArea.pincodes || []
        };
      }

      // Pre-populate first category for dropdown
      if (this.services.length > 0) {
        this.onCategoryChange(this.services[0].categoryId, false);
      }

      // Show modal after data is loaded
      this.showServicesModal = true;
    },
    error: (err) => console.error('Failed to load services', err)
  });
}


closeServicesModal() {
  this.showServicesModal = false;
}


saveServicesAndArea() {
  if (!this.sellerId) return;

  const payload = {
    services: this.services,       // your categories + subcategories
    serviceArea: this.serviceArea  // city/radius/pincode info
  };

  this.sellerService.updateServicesAndArea(this.sellerId, payload).subscribe({
    next: (res) => {
      console.log('Services updated successfully', res);
      this.showServicesModal = false; // close modal
    },
    error: (err) => {
      console.error('Failed to update services', err);
    }
  });
}


}







