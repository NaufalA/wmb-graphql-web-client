import { AxiosInstance } from 'axios';
import { LoginRequest, LoginResponse, RegisterRequest, ResetPasswordRequest, ResetPasswordResponse } from './dto/auth.dto';
import { User } from './dto/user.dto';

export interface AuthAPI {
  login(request: LoginRequest): Promise<LoginResponse>;
  register(request: RegisterRequest): Promise<User>;
  resetPassword(request: ResetPasswordRequest): Promise<ResetPasswordResponse>;
}

export function newAuthAPI(httpClient: AxiosInstance): AuthAPI {
  const login = async (request: LoginRequest): Promise<LoginResponse> => {
    
    const response = await httpClient.post<LoginResponse>('auth/login', request);
     

    return response.data;
  };
  const register = async (request: RegisterRequest): Promise<User> => {
    const response = await httpClient.post<User>('auth/register', request);

    return response.data;
  };
  const resetPassword = async (request: ResetPasswordRequest): Promise<ResetPasswordResponse> => {
    const response = await httpClient.post<ResetPasswordResponse>('auth/resetPassword', request);

    return response.data;
  };
  return {
    login,
    register,
    resetPassword,
  }
}