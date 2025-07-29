type TUser = {
  name: string;
  email: string;
  password: string;
  role: 'Admin' | 'Employee' | 'HR' | 'SuperAdmin' | 'AccountAdmin';
  isApproved: boolean;
  createdAt: Date;
  updatedAt: Date;
  photo: string;
  salary: string;
};

export default TUser;
