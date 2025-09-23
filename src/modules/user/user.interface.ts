// user.interface.ts

type TUser = {
  name: string;
  email: string;
  password: string;
  KPI: number;
  Commission: number; // Current available commission
  role: 'OfficeBoy' | 'Employee' | 'HR' | 'SuperAdmin' | 'AccountAdmin';
  isApproved: boolean;
  createdAt: Date;
  updatedAt: Date;
  photo: string;
  salary: number;

  // New fields
  remainingCasualLeaves: number;
  remainingSickLeaves: number;
};

export default TUser;
