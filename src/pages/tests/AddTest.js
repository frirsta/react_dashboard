import React, { useState } from "react";
import StepOne from "./testSteps/StepOne";
import StepTwo from "./testSteps/StepTwo";
import StepThree from "./testSteps/StepThree";

const AddTest = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    caption: "",
    description: "",
    deadline: "",
  });

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleData = (input) => (e) => {
    const { value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [input]: value,
    }));
  };

  switch (step) {
    case 1:
      return (
        <StepOne
          nextStep={nextStep}
          handleFormData={handleData}
          values={formData}
        />
      );
    case 2:
      return (
        <StepTwo
          prevStep={prevStep}
          nextStep={nextStep}
          handleFormData={handleData}
          values={formData}
        />
      );
    case 3:
      return <StepThree values={formData} />;
    default:
      return <div>Default</div>;
  }
};

export default AddTest;
