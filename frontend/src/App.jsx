import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import NotFoundPage from "./pages/NotFoundPage";
import AddProduct from "./components/Input/AddProduct";
import Categories from "./pages/CategoriesPage";
import Customers from "./pages/CustomersPage";
import Products from "./pages/ProductsPage";
import Suppliers from "./pages/SuppliersPage";
import Transactions from "./pages/TransactionsPage";
import Users from "./pages/UsersPage";
import AddTransaction from "./components/Input/AddTransaction"
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
          <Route path="/add-transaction" element={<AddTransaction />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/products" element={<Products />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
