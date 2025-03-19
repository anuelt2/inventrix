import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import NotFoundPage from "./pages/NotFoundPage";
import SearchBarDisplay from "./components/UI/SearchBar";
import './App.css'


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="*" element={<NotFoundPage />} />
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
