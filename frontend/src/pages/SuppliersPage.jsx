import Layout from "../components/Layout/Layout";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import SuppliersTable from "../components/Tables/SuppliersTable";
import SearchBarDisplay from "../components/UI/SearchBar";
import AddSupplier from "../components/Input/AddSupplier";

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
      <div className="sticky top-9 left-0 right-0 z-100 flex justify-end w-full p-4 mt-10 mb-5 rounded-lg bg-gray-100">
        <AddSupplier />
        <SearchBarDisplay
          endpoint={"/suppliers"}
          placeholder={"Search for suppliers..."}
          className="w-1/3" />
      </div>
      <SuppliersTable />
    </Layout>
  );
};

export default Suppliers;
