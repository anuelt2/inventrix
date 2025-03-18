import Layout from '../Layout/Layout';
import DataTableComponent from '../UI/DataTable';
import OverviewSection from './OverviewSection';


const Dashboard = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Layout>
        <div className="flex flex-1 w-full">
          <OverviewSection data={{
            totalProducts: 100,
            totalSales: 5000,
            totalSuppliers: 20
          }} />
      </div>
      
      {/* Data Table */}
      <div><DataTableComponent /></div>
      </Layout>
    </div>
  );
};

export default Dashboard;
