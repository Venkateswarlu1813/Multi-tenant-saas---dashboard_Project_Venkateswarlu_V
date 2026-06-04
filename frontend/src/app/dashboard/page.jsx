"use client";

import { useEffect, useState } from "react";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import StatCard from "../../components/StatCard";
import RevenueChart from "../../components/RevenueChart";
import RecentActivity from "../../components/RecentActivity";
import { useRouter } from "next/navigation";

import API from "../../services/api";

export default function Dashboard() {
  const router = useRouter();
  const [stats, setStats] = useState({
    total_users: 0,
    total_tenants: 0,
    total_plans: 0,
    active_subscriptions: 0,
    total_revenue: 0,
    unread_notifications: 0,
  });

 const [loading, setLoading] = useState(true);
 const [unreadNotifications, setUnreadNotifications] = useState(0);

useEffect(() => {
  fetchDashboard();
  fetchNotifications();
}, []);

  const fetchDashboard = async () => {
    try {
      const res = await API.get("/dashboard/");

      setStats(res.data);

      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const fetchNotifications = async () => {
  try {
    const res = await API.get("/notifications/");

    const unread = res.data.filter(
      (item) => !item.is_read
    ).length;

    setUnreadNotifications(unread);
  } catch (err) {
    console.log(err);
  }
};

  return (
    <div className="flex bg-slate-950 min-h-screen">
      <Sidebar />

      <div className="flex-1 p-8">
        <Navbar unreadNotifications={unreadNotifications} />

        {loading ? (
          <div className="text-center text-slate-400 mt-20">
            Loading Dashboard...
          </div>
        ) : (
          <>
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

              <StatCard
                title="Users"
                value={stats.total_users}
              />

              <StatCard
                title="Tenants"
                value={stats.total_tenants}
              />

              <StatCard
                title="Plans"
                value={stats.total_plans}
              />

              <StatCard
                title="Subscriptions"
                value={stats.active_subscriptions}
              />

              <StatCard
                title="Revenue"
                value={`₹${stats.total_revenue}`}
              />

              <StatCard
                title="Notifications"
                value={stats.unread_notifications}
              />

            </div>

            {/* Charts + Activity */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">

              <div className="xl:col-span-2 space-y-6">

                <RevenueChart />

                {/* Quick Actions */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

                  <h2 className="text-white text-xl font-bold mb-5">
                    Quick Actions
                  </h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                <button
                  onClick={() => router.push("/admin/tenants")}
                  className="bg-blue-600 hover:bg-blue-700 transition p-4 rounded-xl text-white font-semibold"
                >
                  Add Tenant
                </button>

                <button
                  onClick={() => router.push("/admin/plans")}
                  className="bg-green-600 hover:bg-green-700 transition p-4 rounded-xl text-white font-semibold"
                >
                  Add Plan
                </button>

                <button
                  onClick={() => router.push("/admin/subscriptions")}
                  className="bg-purple-600 hover:bg-purple-700 transition p-4 rounded-xl text-white font-semibold"
                >
                  Notify
                </button>

                <button
                  onClick={() => router.push("/admin/analytics")}
                  className="bg-orange-600 hover:bg-orange-700 transition p-4 rounded-xl text-white font-semibold"
                >
                  Report
                </button>

              </div>
             </div>

                {/* System Overview */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

                  <h2 className="text-white text-xl font-bold mb-5">
                    System Overview
                  </h2>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

                    <div>
                      <p className="text-slate-400">
                        Active Users
                      </p>

                      <p className="text-2xl font-bold text-white mt-2">
                        {stats.total_users}
                      </p>
                    </div>

                    <div>
                      <p className="text-slate-400">
                        Active Tenants
                      </p>

                      <p className="text-2xl font-bold text-green-400 mt-2">
                        {stats.total_tenants}
                      </p>
                    </div>

                    <div>
                      <p className="text-slate-400">
                        Plans
                      </p>

                      <p className="text-2xl font-bold text-blue-400 mt-2">
                        {stats.total_plans}
                      </p>
                    </div>

                    <div>
                      <p className="text-slate-400">
                        Revenue
                      </p>

                      <p className="text-2xl font-bold text-yellow-400 mt-2">
                        ₹{stats.total_revenue}
                      </p>
                    </div>

                  </div>

                </div>

              </div>

              {/* Right Sidebar */}
              <div>
                <RecentActivity />
              </div>

            </div>
          </>
        )}
      </div>
    </div>
  );
}