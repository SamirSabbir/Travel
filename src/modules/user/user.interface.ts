type TUser = {
  name: string;
  email: string;
  password: string;
  role: 'Admin' | 'Empolyee' | 'HR';
  isApproved: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export default TUser;
