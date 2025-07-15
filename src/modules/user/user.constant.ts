export const USER_ROLE = {
  Admin: 'Admin',
  HR: 'HR',
  Employee: 'Employee',
  SuperAdmin : 'SuperAdmin'
} as const;

export type TUserRole = keyof typeof USER_ROLE;
