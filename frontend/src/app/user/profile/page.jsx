"use client";

import { useEffect, useState } from "react";
import API from "../../../services/api";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await API.get("/dashboard/user/");

      setUser(res.data);
    } catch (err) {
      console.error("Profile Error:", err);

      setUser({
        username: "Unknown User",
        role: "USER",
        notifications: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-white">
        Loading Profile...
      </div>
    );
  }

  return (
    <div className="p-8 text-white">
      <h1 className="text-4xl font-bold mb-8">
        My Profile
      </h1>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 max-w-4xl">

        <div className="flex items-center gap-6 mb-8">

          <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-4xl font-bold">
            {user?.username?.charAt(0)?.toUpperCase() || "U"}
          </div>

          <div>
            <h2 className="text-3xl font-bold">
              {user?.username}
            </h2>

            <p className="text-slate-400">
              SaaS Platform User
            </p>
          </div>

        </div>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="bg-slate-800 p-5 rounded-xl">
            <p className="text-slate-400">Username</p>
            <p className="mt-2">{user?.username}</p>
          </div>

          <div className="bg-slate-800 p-5 rounded-xl">
            <p className="text-slate-400">Role</p>
            <p className="mt-2">{user?.role}</p>
          </div>

          <div className="bg-slate-800 p-5 rounded-xl">
            <p className="text-slate-400">Status</p>
            <p className="mt-2 text-green-400">
              Active
            </p>
          </div>

          <div className="bg-slate-800 p-5 rounded-xl">
            <p className="text-slate-400">Notifications</p>
            <p className="mt-2">
              {user?.notifications || 0}
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}