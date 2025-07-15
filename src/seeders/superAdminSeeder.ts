import { UserModel } from '../modules/user/user.model';

export const seedSuperAdmin = async () => {
  try {
    const existingAdmin = await UserModel.findOne({ role: 'SuperAdmin' });

    if (existingAdmin) {
      console.log('Super Admin already exists:', existingAdmin.email);
      return;
    }

    const superAdmin = await UserModel.create({
      name: 'Super Admin',
      email: 'superadmin@example.com',
      password: '123456', // Will be hashed if your model uses pre-save hooks
      role: 'SuperAdmin',
      isApproved: true,
    });

    console.log('Super Admin created successfully:', superAdmin.email);
  } catch (err: any) {
    console.error('Failed to create Super Admin:', err.message);
  }
};
