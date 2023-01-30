import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const FormEditIzin = () => {
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getIzinById = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/izin/${id}`);
        setName(response.data.name);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getIzinById();
  }, [id]);

  const updateIzin = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/izin/${id}`, {
        name: name
      });
      navigate("/izin");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };
  return (
    <div>
      <h1 className="title">Izin</h1>
      <h2 className="subtitle">Edit Izin</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={updateIzin}>
              <p className="has-text-centered">{msg}</p>
              <div className="field">
                <label className="label">Nama Izin</label>
                <div className="control">
                  <input type="text" className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="name" />
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <button type="submit" className="button is-success">
                    Update
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormEditIzin;
