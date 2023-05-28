import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "../../styles/Form.module.css";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [id, setId] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    let data = {firstName, lastName, email, id, password1, password2}
    console.log(data);
    fetch("http://localhost:8000/users", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => {
        toast.success("Register successful");
        navigate("/login");
      })
      .catch((err) => {
        toast.error("Failed : " + err.message);
      });
  };


  return (
    <div>
      <Form className={styles.Form} onSubmit={handleSubmit}>
        <Row>
        <Col>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              required
              onChange={e=>setEmail(e.target.value)}
              value={email}
              name="email"
              type="email"
              placeholder="Enter email"
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              required
              onChange={e=>setId(e.target.value)}
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
                required
                onChange={e=>setFirstName(e.target.value)}
                value={firstName}
                name="firstName"
                type="text"
                placeholder="Enter email"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="formLastname">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                required
                onChange={e=>setLastName(e.target.value)}
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
                required
                onChange={e=>setPassword1(e.target.value)}
                value={password1}
                name="password1"
                type="password"
                placeholder="Password"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicPassword2">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                required
                onChange={e=>setPassword2(e.target.value)}
                value={password2}
                name="password2"
                type="password"
                placeholder="Password"
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Register;
