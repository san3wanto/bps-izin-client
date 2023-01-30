import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container, Table, Button } from "react-bootstrap";
import "bootstrap";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  });

  const getUsers = async () => {
    const response = await axios.get("http://localhost:5000/users");
    setUsers(response.data);
  };

  // method hapus izin
  const deleteUser = async (userId) => {
    await axios.delete(`http://localhost:5000/users/${userId}`);
    getUsers();
  };

  return (
    <Container fluid>
      <div className="d-flex flex-column align-items-center">
        <h2>Daftar User</h2>
      </div>
      <div className="d-flex flex-column align-items-end mx-5 mb-2">
        <Link to="/users/add">Tambahkan</Link>
      </div>
      <div className="mx-5">
        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>NIP</th>
              <th>Jabatan</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.uuid}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.nip}</td>
                <td>{user.jab}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <Button variant="link" size="sm">
                    <Link to={`/users/edit/${user.uuid}`}>Ubah</Link>
                  </Button>
                  {"   "}
                  <Button variant="danger" size="sm" onClick={() => deleteUser(user.uuid)}>
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

export default UserList;
