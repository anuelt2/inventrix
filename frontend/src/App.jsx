import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

// Imports for Landing Page, Registration and Login
import LandingPage from "./pages/LandingPage";
import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";

// Import for Main Page
import DashboardPage from "./pages/DashboardPage";

// Imports for Tables
import Categories from "./pages/CategoriesPage";
import Customers from "./pages/CustomersPage";
import Products from "./pages/ProductsPage";
import ReorderProducts from "./pages/ReorderProductsPage";
import Suppliers from "./pages/SuppliersPage";
import Transactions from "./pages/TransactionsPage";
import Users from "./pages/UsersPage";

// Import for 404 Page
import NotFoundPage from "./pages/NotFoundPage";

// Import for App CSS
import "./App.css";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Routes for Landing Page, Registration and Login */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Routes for Main Page */}
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="*" element={<NotFoundPage />} />

          {/* Routes for Tables */}
          <Route path="/categories" element={<Categories />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/reorder" element={<ReorderProducts />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/users" element={<Users />} />

          {/* Route for 404 Page */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
