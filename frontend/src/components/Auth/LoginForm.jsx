import React, { useState, useEffect, Fragment } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

import Form from "../UI/InputForm";

const Login = () => {
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { user, login } = useAuth();

  // Redirect user to dashboard if already logged in
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

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
    try {
      await login(formData);
      navigate("/dashboard");
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
        errorMessage={errors.general}
      />
    </Fragment>
  );
};

export default Login;
