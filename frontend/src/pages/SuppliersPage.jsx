import Layout from "../components/Layout/Layout";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import SuppliersTable from "../components/Tables/SuppliersTable";
import Dashboard from "../components/Dashboard/DashboardLayout";

const Suppliers = () => {
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
        <SuppliersTable />
      </Dashboard>
    </Layout>
  );
};

export default Suppliers;
