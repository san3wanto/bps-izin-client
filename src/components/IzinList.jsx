import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container, Table, Button } from "react-bootstrap";
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

  // method hapus izin
  const deleteIzin = async (izinId) => {
    await axios.delete(`http://localhost:5000/izin/${izinId}`);
    getIzin();
  };

  return (
    <Container fluid>
      <div className="d-flex flex-column align-items-center">
        <h2>Daftar Izin</h2>
      </div>
      <div className="d-flex flex-column align-items-end mx-5 mb-2">
        <Link to="/izin/add">Tambahkan</Link>
      </div>
      <div className="mx-5">
        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>NIP</th>
              <th>Jabatan</th>
              <th>Keterangan</th>
              <th>Tanggal Dibuat</th>
              <th>Waktu Dibuat</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {izin.map((izin, index) => (
              <tr key={izin.uuid}>
                <td>{index + 1}</td>
                <td>{izin.user.name}</td>
                <td>{izin.user.nip}</td>
                <td>{izin.user.jab}</td>
                <td>{izin.name}</td>
                <td>{`${dayjs(izin.createdAt).format("dddd, DD MMM YYYY")}`}</td>
                <td>{`${dayjs(izin.createdAt).format("HH:mm")} WITA`}</td>
                <td>
                  <Button variant="link" size="sm">
                    <Link to={`/izin/edit/${izin.uuid}`}>Ubah</Link>
                  </Button>
                  {"   "}
                  <Button variant="danger" size="sm" onClick={() => deleteIzin(izin.uuid)}>
                    Hapus
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default IzinList;
