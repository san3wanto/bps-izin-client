import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Button, Card, Form, FloatingLabel } from "react-bootstrap";
import "bootstrap";

const FormAddIzin = () => {
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const saveIzin = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/izin", {
        name: name,
      });
      if (user && user.role === "admin") {
        navigate("/izin");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };
  return (
    <Container fluid>
      <div className="d-flex flex-column mt-2 align-items-center mb-2">
        <h2>Form Izin</h2>
      </div>
      <Card className="d-flex flex-column p-3 align-items-center" style={{ borderRadius: "1.2rem" }}>
        <Form onSubmit={saveIzin} className="d-flex flex-column align-items-center">
          <FloatingLabel controlId="floatingTextarea" label="Keterangan Izin" className="mb-3">
            <Form.Control as="textarea" className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="keterangan izin" />
          </FloatingLabel>
          <Button type="submit" className="Button is-success w-100">
            Simpan
          </Button>
          <p className="has-text-centered">{msg}</p>
        </Form>
      </Card>
    </Container>
  );
};

export default FormAddIzin;
