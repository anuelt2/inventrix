import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import Form from "../UI/InputForm";
import API from "../../utils/api";

const InputTemplate = ({
  fields,
  endpoint,
  alertMsg,
  btnText,
  formTitle,
  initialValue,
  onSubmit = () => {},
}) => {
  const [errors, setErrors] = useState({});
  const { accessToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    }
  }, [accessToken, navigate]);

  const handleSubmit = async (formData) => {
    if (!accessToken) {
      return;
    }

    try {
      await API.post(endpoint, formData, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      alert(alertMsg);
    } catch (error) {
      setErrors({ error: "Missing required form field(s) or unauthorized" });
      console.log(error);
    }
  };

  return (
    <div className="">
      <Form
        fields={fields}
        onSubmit={onSubmit || handleSubmit}
        buttonText={btnText}
        title={formTitle}
        initialValues={initialValue}
        errorMessage={errors.error}
      />
    </div>
  );
};

export default InputTemplate;
