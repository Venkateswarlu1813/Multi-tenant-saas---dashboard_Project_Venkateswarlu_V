"use client";

import {
  FaBell,
  FaUserPlus,
  FaCreditCard,
  FaRocket,
  FaCheckCircle,
} from "react-icons/fa";

export default function NotificationsPage() {
  const notifications = [
    {
      id: 1,
      title: "New Tenant Registered",
      message:
        "Acme Corp has successfully joined the platform.",
      time: "2 mins ago",
      icon: <FaUserPlus />,
      color: "text-blue-400",
    },
    {
      id: 2,
      title: "Subscription Activated",
      message:
        "TechFlow activated the Enterprise Plan.",
      time: "15 mins ago",
      icon: <FaRocket />,
      color: "text-green-400",
    },
    {
      id: 3,
      title: "Payment Received",
      message:
        "₹9,999 payment received successfully.",
      time: "1 hour ago",
      icon: <FaCreditCard />,
      color: "text-yellow-400",
    },
    {
      id: 4,
      title: "Plan Upgraded",
      message:
        "SmartSoft upgraded from Starter to Business.",
      time: "3 hours ago",
      icon: <FaCheckCircle />,
      color: "text-purple-400",
    },
  ];

  return (
    <div className="p-8 text-white">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Notifications Center
        </h1>

        <p className="text-slate-400 mt-2">
          Track all platform activities and updates
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <p className="text-slate-400">
            Total Notifications
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {notifications.length}
          </h2>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <p className="text-slate-400">
            Unread
          </p>

          <h2 className="text-3xl font-bold mt-2 text-orange-400">
            4
          </h2>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <p className="text-slate-400">
            Today
          </p>

          <h2 className="text-3xl font-bold mt-2 text-green-400">
            4
          </h2>
        </div>
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-5 hover:border-blue-500 transition"
          >
            <div className="flex items-start gap-4">
              <div
                className={`text-2xl mt-1 ${notification.color}`}
              >
                {notification.icon}
              </div>

              <div className="flex-1">
                <h3 className="text-lg font-semibold">
                  {notification.title}
                </h3>

                <p className="text-slate-400 mt-1">
                  {notification.message}
                </p>

                <p className="text-xs text-slate-500 mt-3">
                  {notification.time}
                </p>
              </div>

              <FaBell className="text-slate-500" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}