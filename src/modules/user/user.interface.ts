
export type UserRole = "contributor" | "maintainer";

export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  role?:  UserRole;
}


