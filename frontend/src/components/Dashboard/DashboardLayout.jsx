import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import SuppliersTable from "../Tables/SuppliersTable";
import OverviewSection from "./OverviewSection";


const Dashboard = () => {
  const { accessToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    }
  }, [accessToken, navigate]);

  if (!accessToken) {
    return <p>Redirecting...</p>;
  }

  return (
    <div className="flex flex-col min-h-screen">
        <div className="flex flex-1 w-full">
          <OverviewSection
            data={{
              totalProducts: 100,
              totalSales: 5000,
              totalSuppliers: 20,
            }}
          />
          {/* Data Table */}
        <div className="bg-white shadow-lg rounded-lg p-4 mt-6">
          <div className="max-h-150 overflow-y-auto">
            <SuppliersTable />
          </div>
        </div>
        </div> 
    </div>
  );
};

export default Dashboard;
