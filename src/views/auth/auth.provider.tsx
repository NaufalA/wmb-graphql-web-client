import React from 'react';
import { AuthContext, AuthContextData, LoginState } from './auth.context';
import { LS_TOKEN, LS_USER_DATA } from '../../api/constants/local-storage-key';

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps): React.ReactNode {
  const [login, setLogin] = React.useState<LoginState>({
    status: false,
    user: undefined,
    loading: true,
  });
  
  React.useEffect(() => {
    const token = localStorage.getItem(LS_TOKEN);
    const user = localStorage.getItem(LS_USER_DATA);
    if (token && user) {
      setLogin({
        status: true,
        user: JSON.parse(user),
        loading: false,
      });
    } else {
      setLogin((prevState) => ({
        ...prevState,
        loading: false,
      }));
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