export type AuthResponse = {
  user: User;
  accessToken: string;
};

export type User = {
  id: number;
  fullName: string;
  email: string;
  mobileNumber: string;
  creationDate: Date;
  roleId: number;
  role: Role;
};

export type Role = {
  id: number;
  name: string;
  permissions: Permission[];
};

export type Permission = {
  id: number;
  name: string;
  haveAdd: boolean;
  haveEdit: boolean;
  haveDelete: boolean;
  haveView: boolean;
};
