import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Form from "../UI/InputForm";
import { registerUser } from "../../services/AuthService";

const Register = () => {
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const fields = [
    {
      name: "first_name",
      type: "text",
      placeholder: "First Name",
    },
    {
      name: "last_name",
      type: "text",
      placeholder: "Last Name",
    },
    {
      name: "username",
      type: "text",
      placeholder: "Username",
    },
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
    console.log("Submitting:", JSON.stringify(formData, null, 2));
    try {
      await registerUser(formData);
      navigate("/login");
    } catch (error) {
      setErrors({ general: error || "Registration failed. Try again" });
    }
  };

  return (
    <div className="text-gray-600 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
      <Form
        fields={fields}
        onSubmit={handleSubmit}
        buttonText="Register"
        title="Register"
        errorMessages={errors}
      />
    </div>
  );
};

export default Register;
