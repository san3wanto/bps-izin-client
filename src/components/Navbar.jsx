import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../features/authSlice";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import logo from "../bps.png";

const NavB = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="white" variant="white">
      <Container>
        <Navbar.Brand>
          <img alt="logo bps palu" src={logo} style={{ width: "250px" }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="">
          <Nav className="me-auto"></Nav>
          <Nav>
            <Nav.Link>
              <NavLink to={"/dashboard"} style={{ textDecoration: "none" }}>
                Dashboard
              </NavLink>
            </Nav.Link>
            {user && user.role === "admin" && (
              <Nav>
                <Nav.Link>
                  <NavLink to={"/users"} style={{ textDecoration: "none" }}>
                    Pegawai
                  </NavLink>
                </Nav.Link>
              </Nav>
            )}
            <Nav.Link>
              <NavLink to={"/izin"} style={{ textDecoration: "none" }}>
                Izin
              </NavLink>
            </Nav.Link>
            <NavDropdown title={`${user && user.name} (${user && user.role})`} id="collasible-nav-dropdown">
              <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavB;
