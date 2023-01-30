import React from "react";
import { Link } from "react-router-dom";
import Clock from "./Clock";
import Container from "react-bootstrap/Container"

const Welcome = () => {
  return (
    <Container className="d-flex flex-column align-items-center justify-content-center">
      <Clock />
      <Link to="/izin/add" className="button is-primary mb-2">
        Izin Sekarang!
      </Link>{" "}
    </Container>
  );
};

export default Welcome;
