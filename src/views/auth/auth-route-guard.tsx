import { Navigate, Outlet } from 'react-router';
import { AuthContext } from './auth.context';
import React from 'react';

interface AuthRouteGuardProps {
  children?: React.ReactNode;
  shouldLogin?: boolean;
  shouldNotLogin?: boolean;
  roles?: string[];
}

export function AuthRouteGuard({
  children,
  shouldLogin,
  shouldNotLogin,
  roles,
}: AuthRouteGuardProps) {
  const authContext = React.useContext(AuthContext);

  if (authContext?.loginState.status) {
    if (shouldNotLogin) {
      return <Navigate to="/" replace />
    }
    console.log(authContext.loginState.user?.role, roles);
    
    if (roles && !roles.includes((authContext.loginState.user?.role || ''))) {
      return <Navigate to="/forbidden" replace />
    }
  }

  if (!authContext?.loginState.status && shouldLogin) {
    return <Navigate to="/auth/login" replace />
  }

  if (children) {
    return (
      <>
       {children}
      </>
    )
  }
  return (
    <Outlet />
  );
}