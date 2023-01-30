import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LogOut, reset } from "../features/authSlice";
import { Container, Navbar, Nav, NavDropdown, Image } from "react-bootstrap";
import logo from "../bps.png";

const NavB = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { user } = useSelector((state) => state.auth);

  const logout = () => {
    dispatch(LogOut());
    dispatch(reset());
    navigate("/");
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="white" variant="white">
      <Container>
        <div className="d-flex">
          <Navbar.Brand href="/dashboard">
            <Image fluid src={logo} className="w-50" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        </div>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            <Nav.Link href="/users">Pegawai</Nav.Link>
            <Nav.Link href="/izin">Izin</Nav.Link>
            <NavDropdown title="Keluar" id="collasible-nav-dropdown">
              <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavB;
