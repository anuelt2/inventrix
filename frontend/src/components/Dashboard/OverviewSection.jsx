import React from "react";
import { Box, Cable, ShoppingCart } from "lucide-react";


export const OverviewCard = ({ title, value, icon: Icon, color }) => {
  return (
    <div className="flex items-center p-4 bg-white shadow-md rounded-lg">
      <div className={`p-3 rounded-full text-white ${color}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div className="ml-4">
        <h4 className="text-gray-500 text-sm">{title}</h4>
        <p className="text-xl text-gray-500 font-semibold">{value}</p>
      </div>
    </div>
  );
};

const OverviewSection = ({ data }) => {
    return (
    <section className="flex-1 p-6 pt-16 overflow-auto">
      <h1 className="text-2xl font-bold">Overview</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <OverviewCard
            title="Total Products"
            value={data.totalProducts}
            icon={Box}
            color="bg-blue-500"
          />
          <OverviewCard
            title={`Total Sales (${new Date().toLocaleString("default", { month: "long" })})`}
            value={data.totalSales}
            icon={ShoppingCart}
            color="bg-green-500"
          />
          <OverviewCard
            title="Total Suppliers"
            value={data.totalSuppliers}
            icon={Cable}
            color="bg-yellow-500"
          />
      </div>
    </section>
  );
};

export default OverviewSection;
