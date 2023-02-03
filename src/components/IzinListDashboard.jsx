import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container, Table } from "react-bootstrap";
import "bootstrap";

const dayjs = require("dayjs");
require("dayjs/locale/id");
dayjs.locale("id");

const IzinList = () => {
  const [izin, setIzin] = useState([]);

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

      <div className="mx-2">
        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Keterangan</th>
              <th>Waktu Dibuat</th>
            </tr>
          </thead>
          <tbody>
            {izin.map((izin, index) => (
              <tr key={izin.uuid}>
                <td>{index + 1}</td>
                <td>{izin.user.name}</td>
                <td>{izin.name}</td>
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
