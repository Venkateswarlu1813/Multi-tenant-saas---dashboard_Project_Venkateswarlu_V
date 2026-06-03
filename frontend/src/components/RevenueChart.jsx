"use client";

import { useEffect, useState } from "react";
import API from "../services/api";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function RevenueChart() {
  const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    fetchRevenue();
  }, []);

  const fetchRevenue = async () => {
    try {
      const res = await API.get("/dashboard/");

      setRevenue(
        res.data.total_revenue || 0
      );
    } catch (error) {
      console.log(error);
    }
  };

  const data = [
    { month: "Jan", revenue: 0 },
    { month: "Feb", revenue: 0 },
    { month: "Mar", revenue: 0 },
    { month: "Apr", revenue: 0 },
    { month: "May", revenue: 0 },
    { month: "Jun", revenue: revenue },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

      <div className="flex justify-between items-center mb-6">

        <div>
          <h2 className="text-white text-2xl font-bold">
            Revenue Analytics
          </h2>

          <p className="text-slate-400">
            Monthly platform revenue
          </p>
        </div>

        <div className="text-right">

          <p className="text-slate-400">
            Total Revenue
          </p>

          <h3 className="text-green-400 text-2xl font-bold">
            ₹{revenue}
          </h3>

        </div>

      </div>

      <ResponsiveContainer
        width="100%"
        height={350}
      >

        <LineChart data={data}>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#334155"
          />

          <XAxis
            dataKey="month"
            stroke="#94a3b8"
          />

          <YAxis
            stroke="#94a3b8"
          />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#3b82f6"
            strokeWidth={4}
            dot={{ r: 5 }}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  );
}