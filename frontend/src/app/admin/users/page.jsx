"use client";

import { useEffect, useState } from "react";
import API from "../../../services/api";

export default function UsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/auth/users/");
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-white mb-8">
        Users Management
      </h1>

      <div className="bg-slate-900 rounded-xl overflow-hidden">
        <table className="w-full text-white">
          <thead className="bg-slate-800">
            <tr>
              <th className="p-4 text-left">Username</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Role</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-t border-slate-700"
              >
                <td className="p-4">{user.username}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}