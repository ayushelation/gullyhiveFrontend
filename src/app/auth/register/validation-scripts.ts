import { RegisterFormData } from '../models/register.model';

export function validateForm(formData: RegisterFormData): Record<string, string> {
  const errors: Record<string, string> = {};

  // if (!formData.fullName) errors.fullName = 'Full name is required';
  // if (!formData.email) errors.email = 'Email is required';
  // if (!formData.mobile) errors.mobile = 'Mobile number is required';
  // if (formData.serviceCategory.length === 0)
  //   errors.serviceCategory = 'Select at least one service';
  // if (!formData.selfOverview || formData.selfOverview.length < 50)
  //   errors.selfOverview = 'Minimum 50 characters required';

  return errors;
}
