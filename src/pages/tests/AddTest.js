import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "../../styles/Form.module.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const AddTest = () => {
  const [description, setDescription] = useState("");
  const [caption, setCaption] = useState("");
  const [deadline, setDeadline] = useState("");
  const [owner, setOwner] = useState();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      
      let response = sessionStorage.getItem("username");
      if (response === "" || response === null) {
        } else {
          console.log(response)
     
        }
        setOwner(response)
        console.log(response);
      };
      fetchCurrentUser()
  }, [])

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    let testerData = { description, caption, deadline, owner };
    console.log(testerData);
    fetch("http://localhost:8000/testobjects", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(testerData),
    })
      .then((res) => {
        toast.success("Register successful");
        navigate("/testlist");
        console.log(res);
      })
      .catch((err) => {
        toast.error("Failed : " + err.message);
      });
  };
  return (
    <div>
      <h2> add test</h2>
      <Form className={styles.Form} onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Caption</Form.Label>
          <Form.Control
            required
            type="text"
            name="caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            required
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Deadline</Form.Label>
          <Form.Control
            required
            type="date"
            name="deadline"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Owner</Form.Label>
          <Form.Control
          disabled
            required
            type="text"
            name="owner"
            value={owner}
           
          />
        </Form.Group>
          <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
};

export default AddTest;
