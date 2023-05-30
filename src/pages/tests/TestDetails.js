import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useParams } from "react-router-dom";
import styles from "../../styles/TesterDetails.module.css";
import Paper from "@mui/material/Paper";
import Avatar from "../../components/Avatar";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";

const TesterDetails = () => {
  const [data, setData] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = () => {
      fetch("http://localhost:8000/testobjects/" + id)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setData(data);
          console.log(data);
        });
    };
    fetchData();
  }, []);

  return (
    <div className={styles.InfoContainer}>
      <Paper className={styles.Info}>
        <Col>
          <p>{data.caption}</p>
        </Col>
        <Col>
          <p>{data.description}</p>
        </Col>

        <Col>
          <p>{data.deadline}</p>
        </Col>
        <Col>
          <p>{data.owner}</p>
        </Col>
        <Button variant="outlined">
          Delete
          <DeleteIcon />
        </Button>
        <Link to={`/edittester/` + id} variant="outlined">
          Edit
          <EditIcon />
        </Link>
      </Paper>
    </div>
  );
};

export default TesterDetails;
