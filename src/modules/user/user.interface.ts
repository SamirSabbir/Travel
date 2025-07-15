type TUser = {
  name: string;
  email: string;
  password: string;
  role: 'Admin' | 'Employee' | 'HR' | 'SuperAdmin';
  isApproved: boolean;
  createdAt: Date;
  updatedAt: Date;
  photo: string;
};

export default TUser;
