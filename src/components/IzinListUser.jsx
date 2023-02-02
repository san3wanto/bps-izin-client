import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, Table, Button, InputGroup, Form } from "react-bootstrap";
import "bootstrap";

const dayjs = require("dayjs");
require("dayjs/locale/id");
dayjs.locale("id");

const IzinList = () => {
  const [izin, setIzin] = useState([]);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    getIzin();
  });

  const getIzin = async () => {
    const response = await axios.get("http://localhost:5000/izin");
    setIzin(response.data);
  };

  return (
    <Container fluid>
      <div className="d-flex flex-column align-items-center">
        <h2>Daftar Izin</h2>
      </div>
      <div className="d-flex flex-row justify-content-between mx-5 mb-2">
        <div className="d-flex flex-row justify-content-around">
          <InputGroup className="mb-1" size="sm">
            <InputGroup.Text id="basic-addon1">
              <strong>{user && user.name}</strong>
            </InputGroup.Text>
            <Form.Control placeholder={user && user.jab} disabled />
          </InputGroup>
          <InputGroup className="mb-1 ml-3" size="sm">
            <InputGroup.Text id="basic-addon1">NIP</InputGroup.Text>
            <Form.Control placeholder={user && user.nip} disabled />
          </InputGroup>
        </div>
        <Button size="sm">
          <Link to="/izin/add" className="d-flex flex-row align-items-center" style={{ textDecoration: "none", color: "white" }}>
            <box-icon name="plus-circle" rotate="90" color="white"></box-icon>
            Tambahkan
          </Link>
        </Button>
      </div>
      <div className="mx-5">
        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th>No</th>
              <th>Keterangan</th>
              <th>Tanggal Dibuat</th>
              <th>Waktu Dibuat</th>
            </tr>
          </thead>
          <tbody>
            {izin.map((izin, index) => (
              <tr key={izin.uuid}>
                <td>{index + 1}</td>
                <td>{izin.name}</td>
                <td>{`${dayjs(izin.createdAt).format("dddd, DD MMM YYYY")}`}</td>
                <td>{`${dayjs(izin.createdAt).format("HH:mm")} WITA`}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default IzinList;
