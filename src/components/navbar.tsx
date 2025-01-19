import React from "react";
import { Container, Navbar as ReactNavbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router";

export function Navbar(): React.ReactNode {
  return (
    <ReactNavbar expand="lg" className="bg-body-tertiary">
    <Container>
      <ReactNavbar.Brand>WMB</ReactNavbar.Brand>
      <ReactNavbar.Toggle aria-controls="basic-navbar-nav" />
      <ReactNavbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link>
            <Link className="nav-link active" to="">
              Home
            </Link>
          </Nav.Link>
        </Nav>
        <Nav>
          <NavDropdown title="Admin" id="basic-nav-dropdown" align="end">
            <NavDropdown.Item>
              <Link className="dropdown-item" to="admin/products">Manage Products</Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <Link className="dropdown-item" to="admin/users">Manage Users</Link>
            </NavDropdown.Item>
          </NavDropdown>
          <Link to="login" type="button" className="btn btn-success">
            Log in
          </Link>
        </Nav>
      </ReactNavbar.Collapse>
    </Container>
  </ReactNavbar>
  );
}
