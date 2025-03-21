import React from "react";

import Layout from "../components/Layout/Layout";
// import Dashboard from "../components/Dashboard/DashboardLayout";

const LandingPage = () => {
  return (
    <Layout>
      <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center text-center p-6">
        {/* Hero Section */}t-16
        <section className="max-w-3xl">
          <h1 className="text-4xl font-bold text-gray-900">
            Manage Your Inventory Efficiently
          </h1>
          <p className="text-lg text-gray-600 mt-4">
            Inventrix helps you track stock, manage suppliers, and optimize your
            business operations.
          </p>
          <button className="mt-6 bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-700">
            Get Started
          </button>
        </section>
        {/* Features Section */}
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
