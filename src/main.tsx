import React from "react";
import { Route, Routes } from "react-router";
import { NavbarWrapper } from "./components";
import { HomePage } from "./views/home";

export default function Main(): React.ReactNode {
  return (
    <div>
      <Routes>
        <Route path="" element={<NavbarWrapper/>}>
          <Route path="" element={<HomePage />} />
          <Route path="admin">
            <Route path="products" />
            <Route path="users" />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}