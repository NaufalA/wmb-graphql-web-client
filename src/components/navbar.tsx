import React from 'react';
import {
  Container,
  Navbar as ReactNavbar,
  Nav,
  NavDropdown,
} from 'react-bootstrap';
import { Link } from 'react-router';
import { AuthContext } from '../views/auth/auth.context';
import { LS_TOKEN } from '../api/constants/local-storage-key';

export function Navbar(): React.ReactNode {
  const context = React.useContext(AuthContext);
  const handleLogout = React.useCallback(() => {
    context?.setLoginState({
      status: false,
      user: undefined,
    });
    localStorage.removeItem(LS_TOKEN);
    window.alert('logged out!');
    window.location.reload();
  }, [context]);

  return (
    <ReactNavbar expand="lg" className="bg-body-tertiary">
      <Container>
        <ReactNavbar.Brand>WMB</ReactNavbar.Brand>
        <ReactNavbar.Toggle aria-controls="basic-navbar-nav" />
        <ReactNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link className="nav-link" to="">
              Home
            </Link>
          </Nav>
          <Nav className="d-flex gap-2">
            {context?.loginState.user?.role !== 'Guest' && (
              <NavDropdown title="Admin" id="basic-nav-dropdown" align="end">
                <NavDropdown.Item as="div">
                  <Link className="dropdown-item" to="admin/products">
                    Manage Products
                  </Link>
                </NavDropdown.Item>
                {context?.loginState.user?.role === 'SuperAdmin' && (
                  <NavDropdown.Item as="div">
                    <Link className="dropdown-item" to="admin/users">
                      Manage Users
                    </Link>
                  </NavDropdown.Item>
                )}
              </NavDropdown>
            )}
            {!context?.loginState?.status ? (
              <>
                <Link to="/auth/login" type="button" className="btn btn-success">
                  Log in
                </Link>
                <Link
                  to="/auth/register"
                  type="button"
                  className="btn btn-outline-primary"
                >
                  register
                </Link>
              </>
            ) : (
              <button type="button" className="btn text-danger" onClick={handleLogout}>
                Log Out
              </button>
            )}
          </Nav>
        </ReactNavbar.Collapse>
      </Container>
    </ReactNavbar>
  );
}
