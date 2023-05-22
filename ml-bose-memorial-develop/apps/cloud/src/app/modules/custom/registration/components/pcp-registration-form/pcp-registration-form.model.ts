export enum PCPRegistrationFormElementInputs {
  BasicFeeHelperText = 'members-registration-basic-fee-helper-text',
  BasicFeeInput = 'members-registration-basic-fee-field-input',
  CellularNumberHelperText = 'members-registration-cellular-number-helper-text',
  CellularNumberInput = 'members-registration-cellular-number-input',
  EmailHelperText = 'members-registration-email-helper-text',
  EmailInput = 'members-registration-email-input',
  FirstNameHelperText = 'members-registration-first-name-helper-text',
  FirstNameInput = 'members-registration-first-name-input',
  InsurancePlansAcceptedHelperText = 'members-registration-insurance-plans-accepted-helper-text',
  InsurancePlansAcceptedInput = 'members-registration-insurance-plans-accepted-input',
  LastNameHelperText = 'members-registration-last-name-helper-text',
  LastNameInput = 'members-registration--last-name-input',
  MedicareAcceptedHelperText = 'members-registration-medicare-accepted-helper-text',
  MedicareAcceptedInput = 'members-registration-medicare-accepted-input',
  OfficeDaysHelperText = 'members-registration-office-days-helper-text',
  OfficeDaysInput = 'members-registration-office-days-input',
  OfficeHoursHelperText = 'members-registration-office-hours-helper-text',
  OfficeHoursInput = 'members-registration-office-hours-input',
  SpecialistFeeHelperText = 'members-registration-specialist-fee-helper-text',
  SpecialistFeeInput = 'members-registration-specialist-Fee-input',
  SubmitButton = 'submit-button',
  TitleHelperText = 'members-registration-title-helper-text',
  TitleInput = 'members-registration-title-input',
  WorkNumberHelperText = 'members-registration-work-number-helper-text',
  WorkNumberInput = 'members-registration-work-number-input',
}

export interface PCPRegistrationFormProps {
  basicFee: number;
  cellularNumber: string;
  email: string;
  firstName: string;
  formType: string;
  insurancePlansAccepted: string;
  lastName: string;
  medicareAccepted: boolean;
  officeDays: string[];
  officeHours: string;
  specialistFee: number;
  title: string;
  workNumber: string;
}
