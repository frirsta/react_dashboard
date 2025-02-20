import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import styles from "../../styles/Form.module.css";
import Box from "@mui/joy/Box";
import Radio from "@mui/joy/Radio";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditTester = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = () => {
      fetch("http://localhost:8000/users/" + id)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setData(data);
          console.log(data);
        });
    };
    fetchData();
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("http://localhost:8000/users/" + id, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => {
        toast.success("Edit successful");
        navigate("/tester");
        console.log(res);
      })
      .catch((err) => {
        toast.error("Failed : " + err.message);
      });
  };
  return (
    <div>
      {" "}
      <Form onSubmit={handleSubmit} className={styles.Form}>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                autoComplete="new-password"
                onChange={(e) => setData({ ...data, email: e.target.value })}
                name="email"
                type="email"
                placeholder={data.email}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                disabled
                autoComplete="new-password"
                onChange={(e) => setData({ ...data, id: e.target.value })}
                placeholder={data.id}
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
                onChange={(e) =>
                  setData({ ...data, firstName: e.target.value })
                }
                name="firstName"
                placeholder={data.firstName}
                type="text"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="formLastname">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                autoComplete="new-password"
                onChange={(e) => setData({ ...data, lastName: e.target.value })}
                placeholder={data.lastName}
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
                onChange={(e) => setData({ ...data, password: e.target.value })}
                placeholder="Password"
                name="password"
                type="password"
              />
            </Form.Group>
          </Col>
          <Col>
            <Box sx={{ display: "flex", gap: 2 }}>
              <label>Tester</label>
              <Radio
                value="tester"
                checked={data.role === "tester"}
                onChange={(e) => setData({ ...data, role: e.target.value })}
                name="radio-buttons"
                slotProps={{ input: { "aria-label": "Tester" } }}
              />
              <label>Admin</label>
              <Radio
                value="admin"
                checked={data.role === "admin"}
                onChange={(e) => setData({ ...data, role: e.target.value })}
                name="radio-buttons"
                slotProps={{ input: { "aria-label": "Admin" } }}
              />
            </Box>
          </Col>
        </Row>

        <Button variant="primary" type="submit">
          Save
        </Button>
      </Form>
    </div>
  );
};

export default EditTester;
