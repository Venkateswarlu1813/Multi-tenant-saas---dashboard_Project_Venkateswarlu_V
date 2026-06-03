"use client";

import {
  FaUserPlus,
  FaCreditCard,
  FaBuilding,
  FaLayerGroup,
} from "react-icons/fa";

export default function RecentActivity() {
  const activities = [
    {
      title: "Tenants Management Active",
      time: "Live",
      icon: <FaBuilding />,
      color: "text-blue-400",
    },
    {
      title: "Subscriptions Module Active",
      time: "Live",
      icon: <FaCreditCard />,
      color: "text-green-400",
    },
    {
      title: "Users Management Active",
      time: "Live",
      icon: <FaUserPlus />,
      color: "text-yellow-400",
    },
    {
      title: "Plans Module Active",
      time: "Live",
      icon: <FaLayerGroup />,
      color: "text-purple-400",
    },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 h-fit">
      <h2 className="text-white text-xl font-bold mb-6">
        Recent Activity
      </h2>

      <div className="space-y-5">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="flex items-start gap-4 pb-4 border-b border-slate-800 last:border-none"
          >
            <div className={`text-xl ${activity.color}`}>
              {activity.icon}
            </div>

            <div>
              <p className="text-white font-medium">
                {activity.title}
              </p>

              <p className="text-slate-400 text-sm mt-1">
                {activity.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}