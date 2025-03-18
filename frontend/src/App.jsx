import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Login from "./components/Auth/LoginForm";
import Register from "./components/Auth/RegisterForm";
import AddProduct from "./components/Input/AddProduct";
import SearchBarDisplay from "./components/UI/SearchBar";
import Dashboard from "./components/Dashboard/DashboardLayout";
// import Login from "./components/Auth/Login";
// import Register from "./components/Auth/Register";
import "./App.css";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route
            path="/search"
            element={
              <SearchBarDisplay
                endpoint={"/products"}
                placeholder={"Search for products..."}
              />
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
