"use client";

import { useEffect, useState } from "react";
import API from "../../../services/api";

import {
  FaChartLine,
  FaUsers,
  FaBuilding,
  FaCreditCard,
} from "react-icons/fa";

export default function AnalyticsPage() {
  const [tenantCount, setTenantCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
 const [subscriptionCount, setSubscriptionCount] =
  useState(0);

 const [revenue, setRevenue] = useState(0);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
  try {

    const dashboard = await API.get("/dashboard/");

    setTenantCount(
      dashboard.data.total_tenants || 0
    );

    setUserCount(
      dashboard.data.total_users || 0
    );

    setSubscriptionCount(
      dashboard.data.active_subscriptions || 0
    );

    setRevenue(
      dashboard.data.total_revenue || 0
    );

  } catch (err) {
    console.log(err);
  }
};
  const monthlyStats = [
    { month: "Jan", value: 40 },
    { month: "Feb", value: 65 },
    { month: "Mar", value: 55 },
    { month: "Apr", value: 80 },
    { month: "May", value: 95 },
    { month: "Jun", value: 100 },
  ];

  return (
    <div className="p-8 text-white">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Analytics Dashboard
        </h1>

        <p className="text-slate-400 mt-2">
          Platform performance and business insights
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div className="flex justify-between items-center">
            <h3 className="text-slate-400">
              Total Revenue
            </h3>

            <FaChartLine className="text-green-400 text-xl" />
          </div>

          <p className="text-3xl font-bold mt-4">
            ₹{revenue}
          </p>

          <p className="text-green-400 mt-2 text-sm">
            Revenue Tracking
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div className="flex justify-between items-center">
            <h3 className="text-slate-400">
              Active Tenants
            </h3>

            <FaBuilding className="text-blue-400 text-xl" />
          </div>

          <p className="text-3xl font-bold mt-4">
            {tenantCount}
          </p>

          <p className="text-blue-400 mt-2 text-sm">
            Registered Tenants
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div className="flex justify-between items-center">
            <h3 className="text-slate-400">
              Subscriptions
            </h3>

            <FaCreditCard className="text-purple-400 text-xl" />
          </div>

          <p className="text-3xl font-bold mt-4">
            {subscriptionCount}
          </p>

          <p className="text-purple-400 mt-2 text-sm">
            Active Records
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div className="flex justify-between items-center">
            <h3 className="text-slate-400">
              Users
            </h3>

            <FaUsers className="text-yellow-400 text-xl" />
          </div>

          <p className="text-3xl font-bold mt-4">
            {userCount}
          </p>

          <p className="text-yellow-400 mt-2 text-sm">
            Registered Users
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">
        <div className="xl:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-6">
            Monthly Growth
          </h2>

          <div className="space-y-5">
            {monthlyStats.map((item) => (
              <div key={item.month}>
                <div className="flex justify-between mb-2">
                  <span>{item.month}</span>
                  <span>{item.value}%</span>
                </div>

                <div className="w-full bg-slate-800 rounded-full h-3">
                  <div
                    className="bg-blue-500 h-3 rounded-full"
                    style={{
                      width: `${item.value}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-6">
            Platform Metrics
          </h2>

          <div className="space-y-6">
            <div>
              <p className="text-slate-400">
                Total Tenants
              </p>

              <p className="text-2xl font-bold mt-2 text-blue-400">
                {tenantCount}
              </p>
            </div>

            <div>
              <p className="text-slate-400">
                Total Users
              </p>

              <p className="text-2xl font-bold mt-2 text-yellow-400">
                {userCount}
              </p>
            </div>

            <div>
              <p className="text-slate-400">
                Subscriptions
              </p>

              <p className="text-2xl font-bold mt-2 text-purple-400">
                {subscriptionCount}
              </p>
            </div>

            <div>
              <p className="text-slate-400">
                Revenue
              </p>

              <p className="text-2xl font-bold mt-2 text-green-400">
                ₹{revenue}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}