import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import Form from "../UI/InputForm";
import API from "../../utils/api";


const Login = () => {
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const fields = [
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter your email"
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter your password"
    },
  ];

  const handleSubmit = async (formData) => {
    console.log("Submitting:", formData);
    try {
      const response = await API.post("/auth/login", formData);
      localStorage.setItem("access_token", response.tokens.access);
      navigate("/dashboard");
    } catch (error) {
      setErrors({ general: "Invalid email or password" });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Form
        fields={fields}
        onSubmit={handleSubmit}
        buttonText="Login"
        title="User Login"
        errorMessages={errors}
      />
    </div>
  );
};

export default Login;