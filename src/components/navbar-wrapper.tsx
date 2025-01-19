import { Outlet } from "react-router";
import { Navbar } from "./navbar";

export function NavbarWrapper(): React.ReactNode {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
}
