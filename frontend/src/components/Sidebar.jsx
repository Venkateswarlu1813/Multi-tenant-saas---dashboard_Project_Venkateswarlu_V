"use client";

import Link from "next/link";
import {
  FaHome,
  FaUsers,
  FaBuilding,
  FaCreditCard,
  FaBell,
  FaChartBar,
  FaMoneyBillWave,
  FaLayerGroup,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";

export default function Sidebar() {
  const menuItems = [
    {
      name: "Dashboard",
      icon: <FaHome />,
      link: "/dashboard",
    },
    {
      name: "Tenants",
      icon: <FaBuilding />,
      link: "/admin/tenants",
    },
    {
      name: "Users",
      icon: <FaUsers />,
      link: "/admin/users",
    },
    {
      name: "Plans",
      icon: <FaLayerGroup />,
      link: "/admin/plans",
    },
    {
      name: "Subscriptions",
      icon: <FaCreditCard />,
      link: "/admin/subscriptions",
    },
    {
      name: "Payments",
      icon: <FaMoneyBillWave />,
      link: "/admin/payments",
    },
    {
      name: "Notifications",
      icon: <FaBell />,
      link: "/admin/notifications",
    },
    {
      name: "Analytics",
      icon: <FaChartBar />,
      link: "/admin/analytics",
    },
    {
      name: "Profile",
      icon: <FaUserCircle />,
      link: "/admin/profile",
    },
  ];

  return (
    <aside className="w-72 min-h-screen bg-slate-950 border-r border-slate-800 flex flex-col">

      <div className="p-8 border-b border-slate-800">

        <h1 className="text-3xl font-bold text-white">
          SaaS Admin
        </h1>

        <p className="text-slate-400 mt-2">
          Multi-Tenant Platform
        </p>

      </div>

      <nav className="flex-1 p-4 space-y-2">

        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.link}
            className="flex items-center gap-4 p-3 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white transition-all duration-200"
          >
            <span className="text-lg">
              {item.icon}
            </span>

            <span>
              {item.name}
            </span>
          </Link>
        ))}

      </nav>

      <div className="p-4 border-t border-slate-800">

        <button className="w-full flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 transition text-white py-3 rounded-xl font-semibold">

          <FaSignOutAlt />

          Logout

        </button>

      </div>

    </aside>
  );
}