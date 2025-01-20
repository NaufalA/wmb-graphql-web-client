import { createContext } from 'react';
import { User } from '../../api/dto/user.dto';

export interface LoginState {
status: boolean;
user?: User;
}

export interface AuthContextData {
  loginState: LoginState;
  setLoginState: React.Dispatch<React.SetStateAction<LoginState>>
}

export const AuthContext = createContext<AuthContextData | undefined>(undefined);