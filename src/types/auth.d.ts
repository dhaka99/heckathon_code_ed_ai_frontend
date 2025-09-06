import { RoleType } from "./common-types";

export interface User {
  firstName: string;
  lastName: string;
  gender: string;
  dob: number;
  username: string;
  email: string;
  phoneNo: string;
  role: RoleType;
  id: number;
}

export interface LoginApiResponse {
  data: {
    token: string;
    expiresIn: number;
    role: RoleType;
    user: User;
  };
  message: string;
  status: string;
}
