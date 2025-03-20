import Layout from "../components/Layout/Layout";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import CategoriesTable from "../components/Tables/CategoriesTable";
import SearchBarDisplay from "../components/UI/SearchBar";

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
      <div className="flex justify-end w-full p-4 mt-10 mb-5 rounded-lg bg-gray-100">
        <SearchBarDisplay
          endpoint={"/categories"}
          placeholder={"Search for categories..."}
          className="w-1/3" />
      </div>
      <CategoriesTable />
    </Layout>
  );
};

export default Categories;
