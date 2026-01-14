

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map,BehaviorSubject  } from 'rxjs';
// import { environment } from '../../environments/environment';
import { environment } from '../../environments/environment.prod';

// --- Dashboard & Stats ---
export interface SellerStats {
  totalLeads: number;
  totalResponses: number;
  totalEarnings: number;
}

export interface Lead {
  id: number;
  customerName: string;
  serviceName: string;
  location: string;
  description?: string;
  budgetMin?: number;
  budgetMax?: number;
  status: string;
  createdAt: string;

    // UI-only fields
  name?: string;
  service?: string;
  time?: string;
  budget?: string;
  avatar?: string;
}


export interface DashboardData {
  sellerId: number;
  name: string;
  email: string;
  stats: SellerStats;
  recentLeads: Lead[];
}

// export interface PublicProfile {
//   sellerId: number;
//   legalName: string;
//   displayName: string;
//   email: string;
//   phone: string;
//   providerType: string;
//   status: string;
//   baseCity: string;
//   avgRating: number;
//   ratingCount: number;
// }
export interface PublicProfile {
  sellerId: number;
  legalName: string;
  displayName: string;
  email: string;
  phone: string;
  providerType: string;
  status: string;
  baseCity: string;

 // Ratings & stats
  avgRating: number;
  ratingCount: number;
  totalJobsCompleted: number;
  totalDisputes: number;
  disputeRate: number;

   // ✅ Address (primary)
  addressId?: number;
  addressLabel?: string;
  addressLine1?: string;
  addressLine2?: string;
  locality?: string;
  addressCity?: string;
  state?: string;
  pincode?: string;
  description?: string;

  // optional
  services?: string[];
  portfolioImages?: string[];
  reviews?: Review[];

}


export interface Review {
  reviewerName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Response {
  id: number;
  leadId: number;
  leadName: string;
  service: string;
  quoteAmount: number;
  message: string;
  status: 'pending' | 'accepted' | 'declined';
  createdAt: string;
}
// Help FAQ model
export interface HelpCategory {
  id: number;
  title: string;
  description: string;
  icon: string;
  articles: number;
}

export interface HelpFaq {
  id: number;
  question: string;
  answer: string;
}
export interface Referral {
  id: number;
  code: string;
  referrer_user_id: number;
  referrer_role: string;
  referred_type: string;
  referred_user_id: number;
  source: string;
  created_at: string;
   // optional UI fields
  name?: string;
  avatar?: string;
  joinedDate?: string;
  status: 'pending' | 'approved' | 'paid'; // ✅ add this
  earnings?: string;
  amount?: number;   // numeric for totals
}


// export interface PartnerEarning {
//   id: number;
//   partner_user_id: number;
//   referral_id: number;
//   rule_id: number;
//   earning_type: string;
//   amount: number;
//   status: string;
//   created_at: string;
// }

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  private apiUrl = `${environment.apiBaseUrl}/seller`;
  
 // BehaviorSubject will store sellerId and emit it to subscribers
  private sellerIdSubject = new BehaviorSubject<number | null>(null);
  sellerId$ = this.sellerIdSubject.asObservable(); // Observable for components

  constructor(private http: HttpClient) {}

  // --- Auth Headers ---
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  // --- Dashboard ---
  getDashboardData(): Observable<DashboardData> {
    return this.http
      .get<{ success: boolean; data: DashboardData }>(
        `${this.apiUrl}/dashboard`,
        { headers: this.getHeaders() }
      )
    // .pipe(map(res => res.data));
      .pipe(
        map(res => {
          // Save sellerId globally
          this.sellerIdSubject.next(res.data.sellerId);
          return res.data;
        })
      );
  }

  
  // --- All Leads ---
  getLeads(): Observable<Lead[]> {
    return this.http
      .get<{ success: boolean; data: Lead[] }>(
        `${this.apiUrl}/leads`,
        { headers: this.getHeaders() }
      )
      .pipe(map(res => res.data));
  }


getPublicProfile(sellerId: number) {
  return this.http.get<{ success: boolean; data: PublicProfile }>(
      `${this.apiUrl}/completeProfile/${sellerId}`,
      { headers: this.getHeaders() }
    )
    .pipe(map(res => res.data));
}

updateProfile(sellerId: number, payload: any) {
  return this.http.put(
    `${this.apiUrl}/editprofile/${sellerId}`,
    payload
  );
}

   // Pass sellerId here
 getMyResponses(sellerId: number): Observable<{ success: boolean, data: Response[] }> {
  return this.http.get<{ success: boolean, data: Response[] }>(
    `${this.apiUrl}/responses/seller/${sellerId}`,
    { headers: this.getHeaders() }
  );
}


// Helps
 getHelpFaqs(): Observable<{ categories: HelpCategory[]; faqs: HelpFaq[] }> {
    return this.http
      .get<{ success: boolean; categories: HelpCategory[]; faqs: HelpFaq[] }>
      (
        `${this.apiUrl}/faqs`,
         { headers: this.getHeaders() }
      )
      .pipe(
        map(res => ({
          categories: res.categories,
          faqs: res.faqs
        }))
      );
  }

 // Fetch referrals
getReferrals(sellerId: number): Observable<Referral[]> {
  return this.http.get<{ success: boolean; data: Referral[] }>(
    `${this.apiUrl}/refer/${sellerId}`,
    { headers: this.getHeaders() }
  ).pipe(map(res => res.data));
}



}

