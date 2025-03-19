import React, { useState, useContext } from "react";
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
    <div className="text-gray-600 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
      <Form
        fields={fields}
        onSubmit={handleSubmit}
        buttonText="Login"
        title="Login"
        errorMessages={errors}
      />
    </div>
  );
};

export default Login;
