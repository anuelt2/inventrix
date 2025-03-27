import { useState, useEffect } from "react";

import Layout from "../components/Layout/Layout";
import Dashboard from "../components/Dashboard/DashboardLayout";
import { fetchUserData } from "../services/AuthService";

const DashboardPage = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await fetchUserData();
        setUserData(data);
      } catch (error) {
        throw error.response?.data?.message || "Fetching user data failed";
      }
    };
    getUserData();
  }, []);

  return (
    <Layout sideBar={true}>
      <div className="mt-15">
        {userData && (
          <div className="mb-0">
            <h1 className="text-2xl text-gray-600 font-bold">
              Welcome back, {userData ? userData.first_name : "User"}!
            </h1>
            <p className="text-gray-600 mt-3">
              Role: {userData.role.toUpperCase()}
            </p>
          </div>
        )}
        <Dashboard />
      </div>
    </Layout>
  );
};

export default DashboardPage;
