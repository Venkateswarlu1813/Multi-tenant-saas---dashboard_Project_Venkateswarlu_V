"use client";

import { useEffect, useState } from "react";
import {
  FaBell,
  FaSearch,
  FaSignOutAlt,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import API from "../services/api";

export default function Navbar() {
  const router = useRouter();

  const [username, setUsername] = useState("Admin");
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const storedUser =
      localStorage.getItem("username");

    if (storedUser) {
      setUsername(storedUser);
    }

    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await API.get(
        "/notifications/"
      );

      const unread = res.data.filter(
        (item) => !item.is_read
      ).length;

      setUnreadCount(unread);
    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const openNotifications = () => {
    router.push(
      "/admin/notifications"
    );
  };

  return (
    <div className="bg-slate-900 border border-slate-800 px-8 py-4 rounded-2xl mb-6 flex justify-between items-center">

      <div>
        <h1 className="text-3xl font-bold text-white">
          Dashboard
        </h1>

        <p className="text-slate-400 mt-1">
          Welcome Back {username} 👋
        </p>
      </div>

      <div className="flex items-center gap-4">

        <div className="hidden md:flex items-center bg-slate-800 px-4 py-3 rounded-xl">
          <FaSearch className="text-slate-400 mr-3" />

          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none text-white placeholder-slate-500"
          />
        </div>

        {/* Notification Bell */}
        <button
          onClick={openNotifications}
          className="relative bg-slate-800 p-3 rounded-xl text-white hover:bg-slate-700 transition"
        >
          <FaBell size={18} />

          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-xs px-2 py-1 rounded-full">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Profile Circle */}
        <div
          onClick={() =>
            router.push("/admin/profile")
          }
          className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg cursor-pointer hover:bg-blue-700 transition"
        >
          {username.charAt(0).toUpperCase()}
        </div>

        {/* Logout */}
        <button
          onClick={logout}
          className="bg-red-600 hover:bg-red-700 transition px-4 py-3 rounded-xl text-white flex items-center gap-2"
        >
          <FaSignOutAlt />
          Logout
        </button>

      </div>
    </div>
  );
}