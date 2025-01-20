import { Outlet } from "react-router";
import { Navbar } from "./navbar";

export function NavbarWrapper(): React.ReactNode {
  return (
    <div className="h-100 d-flex flex-column gap-3">
      <Navbar />
      <div className="container flex-grow-1 d-flex flex-column">
        <Outlet />
      </div>
    </div>
  );
}
