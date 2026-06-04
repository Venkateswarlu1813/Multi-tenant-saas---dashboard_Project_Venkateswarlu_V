"use client";

import { useEffect, useState } from "react";

export default function AdminProfile() {
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser({
      username: localStorage.getItem("username"),
      role: localStorage.getItem("role"),
      email: localStorage.getItem("email"),
    });
  }, []);

  return (
    <div className="p-8 text-white">
      <h1 className="text-4xl font-bold mb-8">
        Admin Profile
      </h1>

      <div className="bg-slate-900 p-6 rounded-xl max-w-xl">
        <div className="mb-4">
          <strong>Username:</strong> {user.username}
        </div>

        <div className="mb-4">
          <strong>Email:</strong> {user.email || "N/A"}
        </div>

        <div className="mb-4">
          <strong>Role:</strong> {user.role}
        </div>

        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/login";
          }}
          className="mt-4 bg-red-600 px-5 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}