import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import NotFoundPage from "./pages/NotFoundPage";
import SearchBarDisplay from "./components/UI/SearchBar";
import AddProduct from "./components/Input/AddProduct";
import "./App.css";


const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="*" element={<NotFoundPage />} />
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
      </AuthProvider>
    </Router>
  );
};

export default App;
