import React, { useState, useContext, Fragment } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

import Form from "../UI/InputForm";

const Login = () => {
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { login } = useAuth();

  const fields = [
    {
      name: "email",
      type: "email",
      placeholder: "Email",
    },
    {
      name: "password",
      type: "password",
      placeholder: "Password",
    },
  ];

  const handleSubmit = async (formData) => {
    console.log("Submitting:", formData);
    try {
      await login(formData);
      // navigate("/dashboard");
    } catch (error) {
      setErrors({ general: error || "Invalid email or password" });
    }
  };

  return (
    <Fragment>
      <Form
        fields={fields}
        onSubmit={handleSubmit}
        buttonText="Login"
        title="Login"
        errorMessages={errors}
      />
    </Fragment>
  );
};

export default Login;
