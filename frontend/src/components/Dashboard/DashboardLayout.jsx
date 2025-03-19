import Layout from "../Layout/Layout";
import SuppliersTable from "../Tables/SuppliersTable";
import OverviewSection from "./OverviewSection";

const Dashboard = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Layout>
        <div className="flex flex-1 w-full">
          <OverviewSection
            data={{
              totalProducts: 100,
              totalSales: 5000,
              totalSuppliers: 20,
            }}
          />
        </div>

        {/* Data Table */}
        <div className="bg-white shadow-lg rounded-lg p-4 mt-6">
          <div className="max-h-150 overflow-y-auto">
            <SuppliersTable />
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Dashboard;
