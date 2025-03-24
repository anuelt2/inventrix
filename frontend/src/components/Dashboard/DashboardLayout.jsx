import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import OverviewSection from "./OverviewSection";
import API from "../../utils/api";
import MonthlySalesChart from "./SalesChart";
import MonthlyPurchasesChart from "./PurchasesChart";

const Dashboard = () => {
  const { accessToken } = useAuth();
  const navigate = useNavigate();

  const [totalProducts, setTotalProducts] = useState(0);
  const [totalSuppliers, setTotalSuppliers] = useState(0);
  const [totalTransactions, setTotalTransactions] = useState(0);
  
  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    }

    const getTotalProducts = async () => {
      await API.get('/products', {
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        }
      })
      .then(response => setTotalProducts(response.data.total))
      .catch(error => console.error(error))
    }
  
    const getTotalSuppliers = async () => {
      await API.get('/suppliers', {
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        }
      })
      .then(response => setTotalSuppliers(response.data.total))
      .catch(error => console.error(error))
    }

    const getTotalTransactions = async () => {
      await API.get('/transactions', {
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        }
      })
      .then(response => setTotalTransactions(response.data.total))
      .catch(error => console.error(error))
    }
    
    getTotalProducts();
    getTotalSuppliers();
    getTotalTransactions()
  }, [accessToken, navigate, setTotalProducts, setTotalSuppliers, setTotalTransactions]);

  if (!accessToken) {
    return <p>Redirecting...</p>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-1 w-full">
        <OverviewSection
          data={{
            totalProducts: totalProducts,
            totalSales: totalTransactions,
            totalSuppliers: totalSuppliers,
          }}
        />
      </div>
      {/* Data Table */}
      <div className="w-full mt-20">
        <h2 className="text-gray-500">Monthly Sales</h2>
        <MonthlySalesChart
          allTransactions={113}
        />
      </div>
      <div className="w-full mt-20">
        <h2 className="text-gray-500">Monthly Purchases</h2>
        <MonthlyPurchasesChart
          allTransactions={113}
        />
      </div>
    </div>
  );
};

export default Dashboard;
