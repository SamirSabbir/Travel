// user.interface.ts

type TUser = {
  name: string;
  email: string;
  password: string;
  KPI: number;
  commission: number; // Current available commission
  role: 'OfficeBoy' | 'Employee' | 'HR' | 'SuperAdmin' | 'AccountAdmin';
  isApproved: boolean;
  createdAt: Date;
  updatedAt: Date;
  photo: string;
  salary: number;
  passportNo: string;
  passwordExpiryDate: string;
  phoneNo: string;
  address: string;
  joiningDate: string;
  emergencyPhoneNo: string;
  // New fields
  remainingCasualLeaves: number;
  remainingSickLeaves: number;
};

export default TUser;
