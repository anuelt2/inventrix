import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import OverviewSection from "./OverviewSection";

const Dashboard = ({ children }) => {
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
      </div>
      {/* Data Table */}
      <div className="w-full">{children}</div>
    </div>
  );
};

export default Dashboard;
