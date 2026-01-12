export interface RegisterFormData {
  fullName: string;
  email: string;
  mobile: string;
  serviceCategory: string[];
  coverageArea: string;
  businessAddress: string;
  state: string;
  city: string;
  plotNumber: string;
  pinCode: string;
  aadharNumber: string;
  aadharFile: File | null;  
  otherDocument: File | null;
  selfOverview: string;
  skillsBackground: string;
  achievements: string;
  professionalType: string;

  profilePicture?: File | null;
  businessName?: string;
  registrationType?: string;
  registrationNumber?: string;
  gstNumber?: string;
  panNumber?: string;
   role?: string;
    password?: string;
  //   businessAddress: string;
  //   state: string;
  //   city: string;
  //   plotNumber: string;
  //  pinCode: string
}

export interface OTPVerificationData {
  mobile: string;
  otp: string;
}

export enum ProfessionalType {
  INDIVIDUAL = 'individual',
  AGENCY = 'agency',
  FREELANCER = 'freelancer'
}

export enum RegistrationType {
  GST = 'gst',
  PAN = 'pan',
  AADHAAR = 'aadhaar',
  BUSINESS_REGISTRATION = 'business_registration'
}
