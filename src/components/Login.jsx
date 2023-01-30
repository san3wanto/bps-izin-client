import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser, reset } from "../features/authSlice";
import { Button, Container, Form, InputGroup, Card } from "react-bootstrap";
import logo from "../bps.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, isLoading, message } = useSelector((state) => state.auth);
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  let pesan = (pesan) => {
    if (isError) {
      pesan = message;
    } else {
      pesan = "Masukkan email dan password";
    }
    return pesan;
  };

  useEffect(() => {
    if (user || isSuccess) {
      navigate("/dashboard");
    }
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);

  const Auth = (e) => {
    e.preventDefault();
    dispatch(LoginUser({ email, password }));
  };

  if (isError) {
    pesan = message;
  } else {
    pesan = "Masukkan Email dan Password";
  }

  return (
    <Container className="vh-100 d-flex align-items-center justify-content-center">
      <Card style={{ borderRadius: "1.5rem" }} className="d-flex align-items-center justify-content-center p-5">
        <div className="d-flex flex-column align-items-center w-50">
          <Form onSubmit={Auth} className="mt-lg-5 mb-lg-5">
            <img className="fluid" src={logo} alt="bps logo" width="250px" />
            {isError}
            <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
              <Form.Label className="fw-bold">Email</Form.Label>
              <Form.Control type="email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="fw-bold">Password</Form.Label>
              <InputGroup>
                <Form.Control type={passwordShown ? "text" : "password"} className="input mr-2" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                <InputGroup.Text>
                  <box-icon type="solid" name={passwordShown ? "show" : "hide"} size="md color" onClick={togglePassword}></box-icon>
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <Button variant="primary" type="submit" className="d-flex w-100 justify-content-center">
              {isLoading ? "Loading... " : "Login"}
            </Button>
            <h6 className="mt-4 text-center">{`${pesan}`}</h6>
          </Form>
        </div>
      </Card>
    </Container>
  );
};

export default Login;
