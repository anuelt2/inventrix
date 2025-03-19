import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import OverviewSection from "./OverviewSection";
import axios from "axios";

const Dashboard = ({ children }) => {
  const { accessToken } = useAuth();
  const navigate = useNavigate();

  const [totalProducts, setTotalProducts] = useState(0);
  const [totalSuppliers, setTotalSuppliers] = useState(0);
  
  const getTotalProducts = async () => {
    await axios.get('http://localhost:5000/api/v1/products')
    .then(response => setTotalProducts(response.data.total))
    .catch(error => console.error(error))
  }

  const getTotalSuppliers = async () => {
    await axios.get('http://localhost:5000/api/v1/suppliers')
    .then(response => setTotalSuppliers(response.data.total))
    .catch(error => console.error(error))
  }

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    }

    getTotalProducts();
    getTotalSuppliers();
  }, [accessToken, navigate, setTotalProducts, setTotalSuppliers]);

  if (!accessToken) {
    return <p>Redirecting...</p>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1 w-full">
        <OverviewSection
          data={{
            totalProducts: totalProducts,
            totalSales: 5000,
            totalSuppliers: totalSuppliers,
          }}
        />
      </div>
      {/* Data Table */}
      <div className="w-full">{children}</div>
    </div>
  );
};

export default Dashboard;
