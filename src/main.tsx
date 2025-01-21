import React from 'react';
import { Route, Routes } from 'react-router';
import { NavbarWrapper } from './components';
import { HomePage } from './views/home';
import {
  AuthRouteGuard,
  ForgetPasswordPage,
  LoginPage,
  RegisterPage,
} from './views/auth';
import { AuthProvider } from './views/auth/auth.provider';
import { ForbiddenPage } from './views/error';
import {
  ProductCreatePage,
  ProductDetailPage,
  ProductListPage,
} from './views/product';
import RelayEnvironment from './views/relay/RelayEnvironment';
import { FormMode } from './constants';
import { UserListPage, UserCreatePage, UserDetailPage } from './views/user';

export default function Main(): React.ReactNode {
  return (
    <div className="vh-100">
      <RelayEnvironment>
        <AuthProvider>
          <Routes>
            <Route path="" element={<NavbarWrapper />}>
              <Route
                path=""
                element={
                  <AuthRouteGuard shouldLogin>
                    <HomePage />
                  </AuthRouteGuard>
                }
              />
              <Route path="auth" element={<AuthRouteGuard shouldNotLogin />}>
                <Route path="login" element={<LoginPage />} />
                <Route
                  path="forget-password"
                  element={<ForgetPasswordPage />}
                />
                <Route path="register" element={<RegisterPage />} />
              </Route>
              <Route path="admin">
                <Route
                  path="products"
                  element={
                    <AuthRouteGuard
                      shouldLogin
                      roles={['SuperAdmin', 'Admin']}
                    />
                  }
                >
                  <Route path="" element={<ProductListPage />} />
                  <Route path="create" element={<ProductCreatePage />} />
                  <Route
                    path=":id"
                    element={<ProductDetailPage mode={FormMode.EDIT} />}
                  />
                </Route>
                <Route
                  path="users"
                  element={
                    <AuthRouteGuard shouldLogin roles={['SuperAdmin']} />
                  }
                >
                  <Route path="" element={<UserListPage />} />
                  <Route path="create" element={<UserCreatePage />} />
                  <Route
                    path=":id"
                    element={<UserDetailPage mode={FormMode.EDIT} />}
                  />
                </Route>
              </Route>
              <Route path="products">
                <Route
                  path=":id"
                  element={<ProductDetailPage mode={FormMode.VIEW} />}
                />
                ,
              </Route>
              {/* error routes */}
              <Route path="forbidden" element={<ForbiddenPage />} />
            </Route>
          </Routes>
        </AuthProvider>
      </RelayEnvironment>
    </div>
  );
}
