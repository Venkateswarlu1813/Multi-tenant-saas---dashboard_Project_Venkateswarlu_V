"use client";

import { useEffect, useState } from "react";
import API from "../../../services/api";

export default function NotificationsPage() {

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {

      const res = await API.get("/notifications/");

      const data = res.data.results || res.data || [];

      setNotifications(data);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-8 text-white">

      <h1 className="text-4xl font-bold mb-6">
        Notifications
      </h1>

      {notifications.length === 0 ? (
        <div className="bg-slate-900 p-4 rounded-xl">
          No Notifications Available
        </div>
      ) : (
        notifications.map((item) => (
          <div
            key={item.id}
            className="bg-slate-900 p-4 rounded-xl mb-4 border border-slate-800"
          >
            <div className="font-semibold">
              {item.title || "Notification"}
            </div>

            <div className="text-slate-400 mt-1">
              {item.message}
            </div>
          </div>
        ))
      )}

    </div>
  );
}