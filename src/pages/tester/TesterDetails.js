import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import styles from "../../styles/Form.module.css";
import Box from "@mui/joy/Box";
import Radio from "@mui/joy/Radio";
import { useNavigate, useParams } from "react-router-dom";

const EditTester = () => {

  const [data, setData] = useState([]);

  const { id } = useParams();
  const fetchData = () => {
    fetch("http://localhost:8000/users/"+id)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setData(data);
        console.log(data)
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
  };
  return <div>      <Form onSubmit={handleSubmit} className={styles.Form}>
  <Row>
    <Col>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          autoComplete="new-password"
          required
          onChange={(e) => setData({...data, email: e.target.value})}
          name="email"
          type="email"
          value={data.email}
          
        />
      </Form.Group>
    </Col>
    <Col>
      <Form.Group className="mb-3" controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          autoComplete="new-password"
          required
          onChange={(e) => setData({...data, id: e.target.value})}
          value={data.id}
          name="id"
          type="text"
         
        />
      </Form.Group>
    </Col>
  </Row>
  <Row>
    <Col>
      <Form.Group className="mb-3" controlId="formFirstname">
        <Form.Label>First name</Form.Label>
        <Form.Control
          autoComplete="new-password"
          required
          onChange={(e) => setData({...data, firstName: e.target.value})}
          name="firstName"
          value={data.firstName}
          type="text"
          
        />
      </Form.Group>
    </Col>
    <Col>
      <Form.Group className="mb-3" controlId="formLastname">
        <Form.Label>Last name</Form.Label>
        <Form.Control
          autoComplete="new-password"
          required
          onChange={(e) => setData({...data, lastName: e.target.value})}
          value={data.lastName}
          name="lastName"
          type="text"
          
        />
      </Form.Group>
    </Col>
  </Row>
  <Row>
    <Col>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          autoComplete="new-password"
          required
          onChange={(e) => setData({...data, password: e.target.value})}
          value={data.password}
          name="password"
          type="password"
          placeholder="Password"
        />
      </Form.Group>
    </Col>
    <Col>
      <Box sx={{ display: "flex", gap: 2 }}>
        <label>Tester</label>
        <Radio
          value="tester"
          checked={data.role === "tester"}
          onChange={(e) => setData({...data, role : e.target.value})}
          name="radio-buttons"
          slotProps={{ input: { "aria-label": "Tester" } }}
        />
        <label>Admin</label>
        <Radio
          value="admin"
          checked={data.role === "admin"}
          onChange={(e) => setData({...data, role : e.target.value})}
          name="radio-buttons"
          slotProps={{ input: { "aria-label": "Admin" } }}
        />
      </Box>
    </Col>
  </Row>

  <Button variant="primary" type="submit">
   Save
  </Button>
</Form></div>;
};

export default EditTester;
