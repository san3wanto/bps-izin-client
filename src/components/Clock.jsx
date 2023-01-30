import React from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
const dayjs = require('dayjs')
require('dayjs/locale/id')
dayjs.locale('id')

const Clock = () => {
  return (
    <Container className="d-flex flex-column align-items-center justify-content-center">
        <Col style={{ fontSize: 100, fontWeight: 600 }}>
          {`${dayjs().format("HH:mm")}`}
        </Col>
        <div>{`${dayjs().format("dddd, DD MMM YYYY")}`}</div>
    </Container>
  );
};

export default Clock;
