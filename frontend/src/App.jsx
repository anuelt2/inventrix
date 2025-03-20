import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import NotFoundPage from "./pages/NotFoundPage";
import SearchBarDisplay from "./components/UI/SearchBar";
import AddProduct from "./components/Input/AddProduct";
import Categories from "./pages/CategoriesPage";
import Customers from "./pages/CustomersPage";
import Products from "./pages/ProductsPage";
import Suppliers from "./pages/SuppliersPage";
import Transactions from "./pages/TransactionsPage";
import Users from "./pages/UsersPage";
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
          <Route path="/Categories" element={<Categories />} />
          <Route path="/Customers" element={<Customers />} />
          <Route path="/Products" element={<Products />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/Transactions" element={<Transactions />} />
          <Route path="/Users" element={<Users />} />
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
