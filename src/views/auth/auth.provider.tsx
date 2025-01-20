import React from 'react';
import { AuthContext, AuthContextData, LoginState } from './auth.context';
import { LS_TOKEN } from '../../api/constants/local-storage-key';

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps): React.ReactNode {
  const [login, setLogin] = React.useState<LoginState>({
    status: false,
    user: undefined,
  });
  console.log(login);
  
  React.useEffect(() => {
    const token = localStorage.getItem(LS_TOKEN);
    if (token) {
      // parseJWT
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        window
          .atob(base64)
          .split('')
          .map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join('')
      );
      setLogin({
        status: true,
        user: JSON.parse(jsonPayload).user,
      });
    }
  }, []);

  const authContextData: AuthContextData = React.useMemo(() => {
    return {
      loginState: login,
      setLoginState: setLogin,
    }
  }, [login, setLogin]);

  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  )
}