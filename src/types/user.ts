// types/user.ts
import {LoginData} from "@/types/api";

export interface User {
  uuid: string;
  full_name: string;
  email: string;
  company: string | null;
  country: {
    code: string;
    name: string;
  };
  role: string;
  isActive: boolean;
  createdAt: string;
}

export interface UserResponse{
  success: boolean;
  message: string;
  data: LoginData;
}