import React, {useState} from "react";
import { Form, Card, Button } from "react-bootstrap";
import validator from "validator";


const StepOne = ({ nextStep, handleFormData, values }) => {
  const [error, setError] = useState(false);

  const submitFormData = (e) => {
    e.preventDefault();

    if (validator.isEmpty(values.description) || validator.isEmpty(values.date) || validator.isEmpty(values.caption)) {
      setError(true);
    } else {
      nextStep();
    }
  };
  return (
    <div>
      <Card>
        <Card.Body>
          <Form onSubmit={submitFormData}>
            <Form.Group>
              <Form.Label>step1</Form.Label>
              <Form.Control
                type="text"
                onChange={handleFormData("description")}
              />
              {error ? <Form.Text>Required field</Form.Text> : ""}
            </Form.Group>
            <Form.Group>
              <Form.Label>caption</Form.Label>
              <Form.Control type="text" onChange={handleFormData("caption")} />
              {error ? <Form.Text>Required field</Form.Text> : ""}
            </Form.Group>
            <Form.Group>
              <Form.Label>Date</Form.Label>
              <Form.Control type="date" onChange={handleFormData("date")} />
              {error ? <Form.Text>Required field</Form.Text> : ""}
            </Form.Group>

            <Button type="submit" variant="primary">
               Next
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default StepOne;
