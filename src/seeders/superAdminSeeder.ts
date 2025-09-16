import { UserModel } from '../modules/user/user.model';
import bcrypt from 'bcrypt';

export const seedSuperAdmin = async () => {
  try {
    const existingAdmin = await UserModel.findOne({ role: 'SuperAdmin' });

    if (existingAdmin) {
      console.log('Super Admin already exists:', existingAdmin.email);
      return;
    }

    // ✅ Hash the password before saving
    const hashedPassword = await bcrypt.hash('123456', 10);

    const superAdmin = await UserModel.create({
      name: 'Super Admin',
      email: 'superadmin@example.com',
      password: hashedPassword,
      role: 'SuperAdmin',
      isApproved: true,
    });

    console.log('Super Admin created successfully:', superAdmin.email);
  } catch (err: any) {
    console.error('Failed to create Super Admin:', err.message);
  }
};
