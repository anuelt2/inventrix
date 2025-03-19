import Layout from "../components/Layout/Layout";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import CategoriesTable from "../components/Tables/CategoriesTable";
import Dashboard from "../components/Dashboard/DashboardLayout";

const Categories = () => {
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
        <CategoriesTable />
      </Dashboard>
    </Layout>
  );
};

export default Categories;
