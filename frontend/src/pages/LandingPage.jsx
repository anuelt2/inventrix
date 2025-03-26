import React from "react";
import { Link } from "react-router-dom";
import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";

import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/AuthContext";
import coverImage4 from "../assets/images/coverImage4.webp";
import productsView from "../assets/images/productsView.webp";
import feature from "../assets/images/feature.webp";

const LandingPage = () => {
  const { user } = useAuth();

  return (
    // Show sidebar if user is logged in
    <Layout sideBar={!!user}>
      {/* Into Section */}
      <section
        className="min-h-screen flex flex-col items-center justify-center text-center p-6 bg-cover bg-center"
        style={{
          backgroundImage: `url(${coverImage4})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="max-w-3xl mt-10">
          <h1 className="text-6xl font-bold text-gray-900 mb-10">Inventrix</h1>
          <div className="bg-gray-200/25 p-6 mb-6 rounded-lg shadow-lg max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900">
              Manage Your Inventory Efficiently
            </h1>
            <p className="text-lg text-gray-900 mt-4">
              Inventrix helps you track stock, manage transactions, and optimize
              your business operations.
            </p>
          </div>
          {/* Link to dashboard if user is logged in or login page if not */}
          <Link to={user ? "/dashboard" : "/login"}>
            <button className="mt-6 bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700">
              Get Started
            </button>
          </Link>
        </div>
      </section>

      {/* Feature Section */}
      <section className="mt-16 px-6">
        <h2 className="text-3xl font-bold text-centertext-gray-900 mb-10">
          Key Features
        </h2>

        <div className="grid grid-cols-1, md:grid-cols-3 gap-12">
          {/* Feature 1 - Inventory Tracking and Management */}
          <div className="bg-white p-6 shadow-md rounded-lg text-center">
            <img
              src={productsView}
              alt="Product View"
              className="w-full h-48 object-cover rounded-lg"
            />
            <h3 className="text-xl font-semibold text-gray-800 mt-4">
              Inventory Tracking & Management
            </h3>
            <p className="text-gray-600 mt-2">
              Easily track stock levels, add new products, and update inventory
              details in real time. Keep all product information in one place.
            </p>
          </div>

          {/* Feature 2 - Supplier Management */}
          <div className="bg-white p-6 shadow-md rounded-lg text-center">
            <img
              src={feature}
              alt="Supplier Management"
              className="w-full h-48 object-cover rounded-lg"
            />
            <h3 className="text-xl font-semibold text-gray-800 mt-4">
              Sales & Purchase Management
            </h3>
            <p className="text-gray-600 mt-2">
              Record sales to customers, manage purchases from suppliers. Do all
              of these with ease. Keep a clear record of what's sold and when.
            </p>
          </div>

          {/* Feature 3 - Data Insights */}
          <div className="bg-white p-6 shadow-md rounded-lg text-center">
            <img
              src={feature}
              alt="Data Insights"
              className="w-full h-48 object-cover rounded-lg"
            />
            <h3 className="text-xl font-semibold text-gray-800 mt-4">
              Real-Time Stock Tracking
            </h3>
            <p className="text-gray-600 mt-2">
              Get up-to-date stock levels with automated tracking. Receive
              alerts when inventory is low and needs restocking.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-gray-50 py-16 text-center">
        <div className="max-w-6xl mx-auto px-8 md:px-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            About Inventrix
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Inventrix was born out of a desire to help small business owners get
            access to a simple uncomplicated system for managing inventory.
            Having spoken to a number of small business owners, tracking of
            inventory efficiently could be a tedious task, and many struggled
            with doing it properly. This was the inspiration for us to create a
            system that simplifies inventory tracking and also provides insights
            from the business data.
            <br />
            <br />
            This project was carried out in <strong> March 2025</strong> and is
            part of our <strong>ALX Portfolio Project</strong>. You can check it
            out on{" "}
            <a
              href="https://github.com/anuelt2/inventrix"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              GitHub
            </a>
            .
          </p>

          {/* Team Members */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="bg-white p-6 shadow-lg rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800">
                Emmanuel K. Tettey
              </h3>
              <p className="text-gray-600">
                Software Engineer | Fullstack Developer | Process Engineer
              </p>
              <div className="flex justify-center gap-4 mt-4">
                <a
                  href="https://www.linkedin.com/in/emmanuel-tettey-bb656628/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin className="w-6 h-6 text-gray-600 hover:text-gray-800" />
                </a>
                <a
                  href="https://github.com/anuelt2?tab=repositories"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub className="w-6 h-6 text-gray-600 hover:text-gray-800" />
                </a>
                <a
                  href="https://x.com/Emmlkt"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTwitter className="w-6 h-6 text-gray-600 hover:text-gray-800" />
                </a>
              </div>
            </div>

            {/* Team Member 2 */}
            <div className="bg-white p-6 shadow-lg rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800">
                Abdul-Mumin Awinaba
              </h3>
              <p className="text-gray-600">
                Software Engineer | Fullstack Developer
              </p>
              <div className="flex justify-center gap-4 mt-4">
                <a
                  href="https://www.linkedin.com/in/abdul-mumin-awinaba-664683311/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin className="w-6 h-6 text-gray-600 hover:text-gray-800" />
                </a>
                <a
                  href="https://github.com/awinabaab?tab=repositories"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub className="w-6 h-6 text-gray-600 hover:text-gray-800" />
                </a>
                <a
                  href="https://x.com/awinaba37449"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTwitter className="w-6 h-6 text-gray-600 hover:text-gray-800" />
                </a>
              </div>
            </div>

            {/* Team Member 3 */}
            <div className="bg-white p-6 shadow-lg rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800">
                Johnkennedy Umeh
              </h3>
              <p className="text-gray-600">
                Software Engineer | Fullstack Developer
              </p>
              <div className="flex justify-center gap-4 mt-4">
                <a
                  href="https://www.linkedin.com/in/johnkennedy-umeh-979124270/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin className="w-6 h-6 text-gray-600 hover:text-gray-800" />
                </a>
                <a
                  href="https://github.com/Johnkenzzy?tab=repositories"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub className="w-6 h-6 text-gray-600 hover:text-gray-800" />
                </a>
                <a
                  href="https://x.com/JKenzzy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTwitter className="w-6 h-6 text-gray-600 hover:text-gray-800" />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-12">
            <a
              href="https://github.com/anuelt2/inventrix"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700"
            >
              View Project on GitHub
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default LandingPage;
