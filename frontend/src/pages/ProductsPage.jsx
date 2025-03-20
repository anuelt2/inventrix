import Layout from "../components/Layout/Layout";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import ProductsTable from "../components/Tables/ProductsTable";
import SearchBarDisplay from "../components/UI/SearchBar";

const Products = () => {
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
      <div className="flex justify-end w-full p-4 mt-10 mb-5 rounded-lg bg-gray-100">
        <SearchBarDisplay
          endpoint={"/products"}
          placeholder={"Search for products..."}
          className="w-1/3" />
      </div>
      <ProductsTable />
    </Layout>
  );
};

export default Products;