import React from "react";
import { Link } from "react-router-dom";

import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/AuthContext";

const LandingPage = () => {
  const { user } = useAuth();

  return (
    // Show sidebar if user is logged in
    <Layout sideBar={!!user}>
      <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center text-center p-6">
        <section className="max-w-3xl">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">Inventrix</h1>
          <h1 className="text-4xl font-bold text-gray-900 mt-10">
            Manage Your Inventory Efficiently
          </h1>
          <p className="text-lg text-gray-600 mt-4">
            Inventrix helps you track stock, manage suppliers, and optimize your
            business operations.
          </p>

          {/* Link to dashboard if user is logged in or login page if not */}
          <Link to={user ? "/dashboard" : "/login"}>
            <button className="mt-6 bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-700">
              Get Started
            </button>
          </Link>
        </section>

        <section className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800">
              Real-time Stock Tracking
            </h3>
            <p className="text-gray-600 mt-2">
              Monitor inventory levels. Avoid running out of stock.
            </p>
          </div>
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800">
              Supplier Management
            </h3>
            <p className="text-gray-600 mt-2">
              Easily manage orders from your suppliers.
            </p>
          </div>
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800">
              Data Insights
            </h3>
            <p className="text-gray-600 mt-2">
              Make data-driven decisions with detailed analytics.
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default LandingPage;
