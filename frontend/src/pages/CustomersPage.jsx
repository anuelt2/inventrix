import Layout from "../components/Layout/Layout";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import CustomersTable from "../components/Tables/CustomersTable";
import Dashboard from "../components/Dashboard/DashboardLayout";

const Customers = () => {
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
    <Layout sideBar={true}>
      <Dashboard>
        <CustomersTable />
      </Dashboard>
    </Layout>
  );
};

export default Customers;
