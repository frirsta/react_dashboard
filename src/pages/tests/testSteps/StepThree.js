import React from "react";
import { Card } from "react-bootstrap";

const StepThree = ({values}) => {

    const {devices, salary, description, date, caption} = values
  return <div>
    <Card>
        <Card.Body>
           <span>{devices}</span> 
           <span>{salary}</span> 
           <span>{description}</span> 
           <span>{date}</span> 
           <span>{caption}</span> 
        </Card.Body>
    </Card>
  </div>;
};

export default StepThree;
