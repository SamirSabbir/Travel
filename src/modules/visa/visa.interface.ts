export type TUSVisaPayment = {
  userName: string;
  password: string;
  securityQuestion1: string;
  securityQuestion2: string;
  securityQuestion3: string;
};

export type TUSRetrieveDS = {
  name: string;
  email: string;
  applicationId: string;
  sureNameFirst5Letters: string;
  yearOfBirth: number;
  mothersGivenName: string;
};

export type TNonUS = {
  name: string;
  email: string;
  phone: string;
  userName: string;
  password: string;
};
