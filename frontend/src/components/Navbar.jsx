"use client";

import { useEffect, useState } from "react";

import {
  FaBell,
  FaSearch,
  FaSignOutAlt,
} from "react-icons/fa";

export default function Navbar() {

  const [username, setUsername] = useState("Admin");

  useEffect(() => {

    const storedUser =
      localStorage.getItem("username");

    if (storedUser) {
      setUsername(storedUser);
    }

  }, []);

  const logout = () => {

    localStorage.clear();

    window.location.href = "/login";
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

        <button className="relative bg-slate-800 p-3 rounded-xl text-white hover:bg-slate-700 transition">

          <FaBell />

          <span className="absolute -top-1 -right-1 bg-red-500 text-xs px-1 rounded-full">
            4
          </span>

        </button>

        <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">

          {username.charAt(0).toUpperCase()}

        </div>

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