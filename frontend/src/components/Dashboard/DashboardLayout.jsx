import DataTableComponent from '../UI/DataTable';
import OverviewSection from './OverviewSection';


const Dashboard = () => {
  return (
    <div className="flex flex-col min-h-screen">
        <div className="flex flex-1 flex-col pb-30 w-full">
          <OverviewSection data={{
            totalProducts: 100,
            totalSales: 5000,
            totalSuppliers: 20
        }} />
        <div>
          <DataTableComponent />
        </div>
      </div>
      
      {/* Data Table */}
    </div>
  );
};

export default Dashboard;
