import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useParams } from "react-router-dom";
import styles from "../../styles/TesterDetails.module.css";
import Paper from "@mui/material/Paper";
import Avatar from '../../components/Avatar';

const TesterDetails = () => {
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

  
  fetchData();

  return (
    <div className={styles.InfoContainer}>

      <Paper className={styles.Info}>
      
        <Avatar />
        <Row>
          <Col>
            <p>{data.email}</p>
          </Col>
          <Col>
            <p>{data.id}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>{data.firstName}</p>
          </Col>
          <Col>
            <p>{data.lastName}</p>
          </Col>
        </Row>
       
      </Paper>
    </div>
  );
};

export default TesterDetails;
