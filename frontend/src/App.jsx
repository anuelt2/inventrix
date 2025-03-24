import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

// Imports for Landing Page, Registration and Login
import LandingPage from "./pages/LandingPage";
import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";

// Import for Main Page
import DashboardPage from "./pages/DashboardPage";

// Imports for Input Forms
import AddProduct from "./components/Input/AddProduct";
import AddTransaction from "./components/Input/AddTransaction";
import AddSupplier from "./components/Input/AddSupplier";
import AddCategory from "./components/Input/AddCategory";
import AddCustomer from "./components/Input/AddCustomer";

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

          {/* Routes for Input Forms */}
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/add-transaction" element={<AddTransaction />} />
          <Route path="/add-supplier" element={<AddSupplier />} />
          <Route path="/add-category" element={<AddCategory />} />
          <Route path="/add-customer" element={<AddCustomer />} />

          {/* Route for 404 Page */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
