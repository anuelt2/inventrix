import { useState } from "react";

import Form from "../UI/InputForm";


const InputTemplate= ({ fields, endpoint, alertMsg, btnText, formTitle, initialValue }) => {
  const [errors, setErrors] = useState({});
 
  const handleSubmit = async (formData) => {
    console.log("Submitting:", formData);
    try {
      await API.post(endpoint, formData);
      alert(alertMsg);
    } catch (error) {
      setErrors({ error: error });
    }
    console.log("Submittd", formData);
  };

  return (
    <div className="p-6">
      <Form
        fields={fields}
        onSubmit={handleSubmit}
        buttonText={btnText}
        title={formTitle}
        initialValues={initialValue}
        errorMessages={errors} />
    </div>
  );
};

export default InputTemplate