import react, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/register",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 201) {
        setSuccess("Registration successful!");
        setFormData({
          firstName: "",
          lastName: "",
          username: "",
          email: "",
          password: "",
        });
      } else {
        throw new Error("Something is not right here");
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "Registration failed. Try again"
      );
    }
  };

  // Registration form
  return (
    <div className="fixed inset-0 mt-20 flex items-center justify-center min-h-screen w-screen bg-gray-100">
      <div className="bg-white p-20 rounded-lg shadow-md w-130">
        <h2 className="text-gray-900 text-2xl font-bl=old mb-4 text-center">Register</h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        {success && <p className="text-green-500 text-sm mb-2">{success}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="w-full p-2 border text-gray-700 border-gray-400 rounded focus:outline-none focus:ring-gray-500 placeholder-gray-400 transition-all"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="w-full p-2 border text-gray-700 border-gray-400 rounded focus:outline-none focus:ring-gray-500 placeholder-gray-400 transition-all"
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full p-2 border text-gray-700 border-gray-400 rounded focus:outline-none focus:ring-gray-500 placeholder-gray-400 transition-all"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 border text-gray-700 border-gray-400 rounded focus:outline-none focus:ring-gray-500 placeholder-gray-400 transition-all"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-2 border text-gray-700 border-gray-400 rounded focus:outline-none focus:ring-gray-500 placeholder-gray-400 transition-all"
          />
          <button type="submit" className="w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
