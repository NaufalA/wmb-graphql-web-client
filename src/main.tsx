import React from "react";
import { Route, Routes } from "react-router";
import { NavbarWrapper } from "./components";
import { HomePage } from "./views/home";
import { AuthRouteGuard, ForgetPasswordPage, LoginPage, RegisterPage } from './views/auth';
import { AuthProvider } from './views/auth/auth.provider';
import { ForbiddenPage } from './views/error';

export default function Main(): React.ReactNode {
  return (
    <div className="vh-100">
      <AuthProvider>
        <Routes>
          <Route path="" element={<NavbarWrapper/>}>
            <Route path="" element={<HomePage />} />
            <Route path="auth" element={<AuthRouteGuard shouldNotLogin />}>
              <Route path="login" element={<LoginPage />} />
              <Route path="forget-password" element={<ForgetPasswordPage />} />
              <Route path="register" element={<RegisterPage />} />
            </Route>
            <Route path="admin">
              <Route
                path="products"
                element={
                  <AuthRouteGuard shouldLogin roles={['SuperAdmin', 'Admin']} />
                }
              />
              <Route
                path="users"
                element={
                  <AuthRouteGuard shouldLogin roles={['SuperAdmin']} />
                }
              />
            </Route>
            {/* error routes */}
            <Route
              path="forbidden"
              element={<ForbiddenPage />}
            />
            </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}