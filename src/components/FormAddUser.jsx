import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Button, Card, Form } from "react-bootstrap";
import "bootstrap";

const FormAddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nip, setNip] = useState("");
  const [jab, setJab] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [role, setRole] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const saveUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/users", {
        name: name,
        email: email,
        nip: nip,
        jab: jab,
        password: password,
        confPassword: confPassword,
        role: role,
      });
      navigate("/users");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };
  return (
    <Container fluid className="d-flex flex-column align-items-center">
      <div className="d-flex flex-column mt-2">
        <h2>Form User</h2>
      </div>
      <Card className="d-flex flex-column p-5" style={{ borderRadius: "1.2rem" }}>
        <Form onSubmit={saveUser}>
          <p>{msg}</p>
          <Form.Group className="mb-3" controlId="formBasicNama">
            <Form.Label>Nama</Form.Label>
            <Form.Control size="md" type="text" placeholder="Masukkan Nama" value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Alamat Email</Form.Label>
            <Form.Control size="md" type="email" placeholder="Masukkan email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicNip">
            <Form.Label>NIP</Form.Label>
            <Form.Control size="md" type="text" placeholder="Masukkan NIP" value={nip} onChange={(e) => setNip(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicJab">
            <Form.Label>Jabatan</Form.Label>
            <Form.Control size="md" type="text" placeholder="Masukkan Jabatan" value={jab} onChange={(e) => setJab(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control size="md" type="password" placeholder="Masukkan Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Konfirmasi Password</Form.Label>
            <Form.Control type="password" placeholder="Masukkan Kembali Password" value={confPassword} onChange={(e) => setConfPassword(e.target.value)} />
          </Form.Group>
          <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
            <option>Pilih Peran Anda</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </Form.Select>
          <Button variant="primary" type="submit" className="d-flex w-100 justify-content-center mt-4">
            Simpan
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default FormAddUser;
