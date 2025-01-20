export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
	token: string;
}

export interface RegisterRequest {
	email: string;
	fullName: string;
	password: string;
}

export interface ResetPasswordRequest {
	email: string;
}

export interface ResetPasswordResponse {
	newPassword: string;
}
