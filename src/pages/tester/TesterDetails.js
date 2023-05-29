import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useParams } from "react-router-dom";
import styles from "../../styles/TesterDetails.module.css";
import Paper from "@mui/material/Paper";
import Avatar from '../../components/Avatar';
import { Form } from "react-bootstrap";
import { useCurrentUser } from "../../context/CurrentUserContext";

const TesterDetails = () => {
  const [data, setData] = useState([]);
  const [profileImage, setProfileImage] = useState(null)
  const {currentUser, setCurrentUser} = useCurrentUser()

  useEffect(() => {
    setCurrentUser()
  }, [])

  const { id } = useParams();

  return (
    <div className={styles.InfoContainer}>
      {currentUser}
      <Paper className={styles.Info}>
       <input type="file" value={profileImage} onChange={(e) => setProfileImage(e.target.files[0])} />
        <Avatar src={profileImage} />
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
