import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import styles from "../styles/Form.module.css";
import { toast } from "react-toastify";
import Box from "@mui/joy/Box";
import Radio from "@mui/joy/Radio";
import { useNavigate } from "react-router-dom";

const AddTester = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [id, setId] = useState("");
  const [role, setRole] = useState("admin");
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    let testerData = { id, email, firstName, lastName, password, role };
    console.log(testerData);
    fetch("http://localhost:8000/users", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(testerData),
    })
      .then((res) => {
        toast.success("Register successful");
        navigate("/tester");
        console.log(res);
      })
      .catch((err) => {
        toast.error("Failed : " + err.message);
      });
  };
  return (
    <div>
      <Form onSubmit={handleSubmit} className={styles.Form}>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                autoComplete="new-password"
                required
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                type="email"
                value={email}
                placeholder="Enter email"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                autoComplete="new-password"
                required
                onChange={(e) => setId(e.target.value)}
                value={id}
                name="id"
                type="text"
                placeholder="Enter username"
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
                onChange={(e) => setFirstName(e.target.value)}
                name="firstName"
                value={firstName}
                type="text"
                placeholder="Enter email"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="formLastname">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                autoComplete="new-password"
                required
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                name="lastName"
                type="text"
                placeholder="Enter email"
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
                onChange={(e) => setPassword(e.target.value)}
                value={password}
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
                checked={role === "tester"}
                onChange={(e) => setRole(e.target.value)}
                name="radio-buttons"
                slotProps={{ input: { "aria-label": "Tester" } }}
              />
              <label>Admin</label>
              <Radio
                value="admin"
                checked={role === "admin"}
                onChange={(e) => setRole(e.target.value)}
                name="radio-buttons"
                slotProps={{ input: { "aria-label": "Admin" } }}
              />
            </Box>
          </Col>
        </Row>

        <Button variant="primary" type="submit">
          Create
        </Button>
      </Form>
    </div>
  );
};

export default AddTester;
