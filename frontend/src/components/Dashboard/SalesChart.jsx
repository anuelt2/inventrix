import React from "react";
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import API from "../../utils/api";


const MonthlySalesChart = ({allTransactions}) => {
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await API.get(`/transactions?limit=${allTransactions}`);
        const transactions = response.data.data;
        const currentYear = new Date().getFullYear();
        
        const monthlySales = Array(12).fill(0);
        
        transactions.forEach(({ transaction_type, created_at, total_amount }) => {
          const transactionDate = new Date(created_at);
          if (transaction_type === "sale" && transactionDate.getFullYear() === currentYear) {
            const month = transactionDate.getMonth();
            monthlySales[month] += parseFloat(total_amount);
           }
        });

        const formattedData = monthlySales.map((total, index) => ({
          month: new Date(currentYear, index).toLocaleString("default", { month: "short" }),
          sales: total,
        }));

        setSalesData(formattedData);
      } catch (error) {
        console.error("Error fetching transactions", error);
      }
    };
    
    fetchSales();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={350}>
        <BarChart data={salesData}>
        {/* Add grid for better visibility */}
        <CartesianGrid strokeDasharray="3 3" opacity={0.5} />

        {/* Customize X-Axis */}
        <XAxis 
        dataKey="month" 
        tick={{ fill: "#4F46E5", fontSize: 12 }} 
        axisLine={{ stroke: "#ccc" }} 
        />

        {/* Customize Y-Axis */}
        <YAxis 
        tick={{ fill: "#4F46E5", fontSize: 12 }} 
        axisLine={{ stroke: "#ccc" }} 
        />

        {/* Tooltip with formatted values */}
        <Tooltip 
        contentStyle={{
            backgroundColor: "#fff",
            color: "gray",
            borderRadius: "8px",
            border: "1px solid #ccc"
        }} 
        formatter={(value) => `$${value.toFixed(2)}`} 
        />

        {/* Legend for better readability */}
        <Legend verticalAlign="top" height={36} />

        {/* Stylish Bars */}
        <Bar 
        dataKey="sales" 
        fill="url(#salesGradient)" 
        radius={[8, 8, 0, 0]} 
        />

        {/* Gradient Fill for Bars */}
        <defs>
        <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4F46E5" stopOpacity={0.9} />
            <stop offset="100%" stopColor="#4F46E5" stopOpacity={0.6} />
        </linearGradient>
        </defs>
        </BarChart>
    </ResponsiveContainer>
  );
};

export default MonthlySalesChart;