type TUser = {
  name: string;
  email: string;
  password: string;
  KPI: number;
  Commission: number;
  role: 'OfficeBoy' | 'Employee' | 'HR' | 'SuperAdmin' | 'AccountAdmin';
  isApproved: boolean;
  createdAt: Date;
  updatedAt: Date;
  photo: string;
  salary: number;
};

export default TUser;
