import React, {useState} from "react";
import { Form, Card, Button } from "react-bootstrap";
import validator from "validator";


const StepTwo = ({ nextStep, handleFormData, prevStep, values }) => {
  const [error, setError] = useState(false);

  const submitFormData = (e) => {
    e.preventDefault();

    if (validator.isEmpty(values.devices) || validator.isEmpty(values.salary)) {
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
              <Form.Label>step2</Form.Label>
              <Form.Control
                type="text"
                onChange={handleFormData("devices")}
              />
              {error ? <Form.Text>Required field</Form.Text> : ""}
            </Form.Group>
            <Form.Group>
              <Form.Label>salary</Form.Label>
              <Form.Control type="text" onChange={handleFormData("salary")} />
              {error ? <Form.Text>Required field</Form.Text> : ""}
            </Form.Group>
            <Button onClick={prevStep} variant="primary">
               Previous
            </Button>

            <Button type="submit" variant="primary">
               Next
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default StepTwo;
