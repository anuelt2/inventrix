import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./components/Auth/LoginForm";
import Dashboard from "./components/Dashboard/DashboardLayout";
import AddProduct from "./components/Input/AddProduct";
import SearchBarDisplay from "./components/UI/SearchBar";
import './App.css'


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/search" element={<SearchBarDisplay
          endpoint={"/products"}
          placeholder={"Search for products..."}
        />}
        />
      </Routes>
    </Router>
  );
}

export default App;
