"use client";

import { useEffect, useState } from "react";
import API from "../../services/api";

export default function UserDashboard() {

  const [userData, setUserData] = useState({
    username: "",
    role: "",
    notifications: 0,
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await API.get("/dashboard/user/");
      setUserData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-8 text-white">

      <h1 className="text-4xl font-bold mb-8">
        User Dashboard
      </h1>

      <div className="grid md:grid-cols-4 gap-6">

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <h3 className="text-slate-400">
            Username
          </h3>

          <p className="text-3xl font-bold mt-3">
            {userData.username}
          </p>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <h3 className="text-slate-400">
            Role
          </h3>

          <p className="text-3xl font-bold mt-3 text-green-400">
            {userData.role}
          </p>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <h3 className="text-slate-400">
            Notifications
          </h3>

          <p className="text-3xl font-bold mt-3">
            {userData.notifications}
          </p>
        </div>

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
          <h3 className="text-slate-400">
            Status
          </h3>

          <p className="text-3xl font-bold mt-3 text-green-400">
            Active
          </p>
        </div>

      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 mt-8">

        <h2 className="text-2xl font-bold mb-4">
          Account Information
        </h2>

        <div className="space-y-4">

          <div>
            Logged in as {userData.username}
          </div>

          <div>
            Role: {userData.role}
          </div>

          <div>
            Notifications: {userData.notifications}
          </div>

          <div>
            Account Status: Active
          </div>

        </div>

      </div>

    </div>
  );
}