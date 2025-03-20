import { useState } from "react";

import Form from "../UI/InputForm";
import API from "../../utils/api"


const InputTemplate= ({ fields, endpoint, alertMsg, btnText, formTitle, initialValue }) => {
  const [errors, setErrors] = useState({});
 
  const handleSubmit = async (formData) => {
    try {
      await API.post(endpoint, formData);
      alert(alertMsg);
    } catch (error) {
      setErrors({ error: "Missing required form field(s)" });
      console.log(error)
    }
  };

  return (
    <div className="p-6">
      <Form
        fields={fields}
        onSubmit={handleSubmit}
        buttonText={btnText}
        title={formTitle}
        initialValues={initialValue}
        errorMessage={errors.error} />
    </div>
  );
};

export default InputTemplate;