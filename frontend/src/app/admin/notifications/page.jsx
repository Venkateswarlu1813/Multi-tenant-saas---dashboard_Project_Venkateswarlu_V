"use client";

import { useEffect, useState } from "react";
import API from "../../../services/api";

import {
  FaBell,
  FaUserPlus,
  FaCreditCard,
  FaRocket,
  FaCheckCircle,
} from "react-icons/fa";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await API.get("/notifications/");

      setNotifications(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const markAsRead = async (id) => {
    try {
      await API.patch(`/notifications/${id}/`, {
        is_read: true,
      });

      fetchNotifications();
    } catch (error) {
      console.log(error);
    }
  };

  const unreadCount = notifications.filter(
    (n) => !n.is_read
  ).length;

  const getIcon = (title) => {
    if (title.includes("Tenant"))
      return <FaUserPlus className="text-blue-400" />;

    if (title.includes("Payment"))
      return <FaCreditCard className="text-yellow-400" />;

    if (title.includes("Subscription"))
      return <FaRocket className="text-green-400" />;

    return <FaCheckCircle className="text-purple-400" />;
  };

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
            {unreadCount}
          </h2>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <p className="text-slate-400">
            Read
          </p>

          <h2 className="text-3xl font-bold mt-2 text-green-400">
            {notifications.length - unreadCount}
          </h2>
        </div>

      </div>

      <div className="space-y-4">

        {notifications.map((notification) => (

          <div
            key={notification.id}
            onClick={() =>
              markAsRead(notification.id)
            }
            className={`cursor-pointer rounded-2xl p-5 border transition hover:border-blue-500
            ${
              notification.is_read
                ? "bg-slate-900 border-slate-800 opacity-70"
                : "bg-slate-900 border-blue-500"
            }`}
          >
            <div className="flex items-start gap-4">

              <div className="text-2xl mt-1">
                {getIcon(notification.title)}
              </div>

              <div className="flex-1">

                <h3 className="text-lg font-semibold">
                  {notification.title}
                </h3>

                <p className="text-slate-400 mt-1">
                  {notification.message}
                </p>

                <p className="text-xs text-slate-500 mt-3">
                  {new Date(
                    notification.created_at
                  ).toLocaleString()}
                </p>

              </div>

              {!notification.is_read && (
                <FaBell className="text-orange-400" />
              )}

            </div>
          </div>

        ))}

      </div>
    </div>
  );
}