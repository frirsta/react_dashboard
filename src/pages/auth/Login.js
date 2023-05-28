import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import styles from "../../styles/Form.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    sessionStorage.clear();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      // console.log('works')
      fetch("http://localhost:8000/users/" + username)
        .then((res) => {
          return res.json();
        })
        .then((resp) => {
          console.log(resp);
          if (Object.keys(resp).length === 0) {
            toast.error("Enter valid username");
          } else {
            if (resp.password === password) {
              toast.success("Success");
              sessionStorage.setItem("username", username);
              sessionStorage.setItem("userrole", resp.role);
              navigate("/");
            } else {
              toast.error("Enter valid credentials");
            }
          }
        })
        .catch((err) => {
          toast.error("Login failed due to :" + err.message);
        });
    } 
  };

  const validate = () => {
    let result = true;
    if (username === "" || username === null) {
      result = false;
      toast.warn("Enter username");
    }
    if (password === "" || password === null) {
      result = false;
      toast.warn("Enter password");
    }
    return result;
  };

  return (
    <div>
      <Form onSubmit={handleSubmit} className={styles.Form}>
        <Col>
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              name="username"
              type="text"
              placeholder="Enter username"
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              type="password"
              placeholder="Enter Password"
            />
          </Form.Group>
        </Col>
        <Button variant="primary" type="submit">
          Log in
        </Button>
        Don't have an account
        <NavLink className={styles.NavLink} to={"/register"}>
          <PersonAddIcon />
          Sign up
        </NavLink>
      </Form>
    </div>
  );
};

export default Login;
