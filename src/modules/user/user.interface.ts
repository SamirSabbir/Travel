type TUser = {
  name: string;
  email: string;
  password: string;
  role: 'Admin' | 'Empolyee' | 'HR';
  isBlocked: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export default TUser;
