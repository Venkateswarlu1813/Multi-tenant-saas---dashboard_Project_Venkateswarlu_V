"use client";

import { useEffect, useState } from "react";
import API from "../../../services/api";
import Modal from "../../../components/Modal";

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [users, setUsers] = useState([]);
  const [plans, setPlans] = useState([]);

  const [open, setOpen] = useState(false);

  const [userId, setUserId] = useState("");
  const [planId, setPlanId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    fetchSubscriptions();
    fetchUsers();
    fetchPlans();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      const res = await API.get("/subscriptions/");
      setSubscriptions(
        Array.isArray(res.data)
          ? res.data
          : res.data.results || []
      );
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await API.get("/auth/users/");
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchPlans = async () => {
    try {
      const res = await API.get("/plans/");
      setPlans(
        Array.isArray(res.data)
          ? res.data
          : res.data.results || []
      );
    } catch (err) {
      console.log(err);
    }
  };

  const addSubscription = async () => {
    try {
      await API.post("/subscriptions/", {
        user: userId,
        plan: planId,
        start_date: startDate,
        end_date: endDate,
        active: true,
      });

      alert("Subscription Created");

      setOpen(false);

      setUserId("");
      setPlanId("");
      setStartDate("");
      setEndDate("");

      fetchSubscriptions();
    } catch (err) {
      console.log(err);
      alert(
        JSON.stringify(
          err.response?.data,
          null,
          2
        )
      );
    }
  };

  return (
    <div className="p-8 text-white">

      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-4xl font-bold">
            Subscription Management
          </h1>

          <p className="text-slate-400 mt-2">
            Manage all tenant subscriptions
          </p>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl"
        >
          + Add Subscription
        </button>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">

        <div className="bg-slate-900 p-5 rounded-xl">
          <p className="text-slate-400">
            Total
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {subscriptions.length}
          </h2>
        </div>

        <div className="bg-slate-900 p-5 rounded-xl">
          <p className="text-slate-400">
            Active
          </p>

          <h2 className="text-3xl font-bold text-green-400 mt-2">
            {
              subscriptions.filter(
                (s) => s.active
              ).length
            }
          </h2>
        </div>

        <div className="bg-slate-900 p-5 rounded-xl">
          <p className="text-slate-400">
            Expired
          </p>

          <h2 className="text-3xl font-bold text-red-400 mt-2">
            {
              subscriptions.filter(
                (s) => !s.active
              ).length
            }
          </h2>
        </div>

        <div className="bg-slate-900 p-5 rounded-xl">
          <p className="text-slate-400">
            Revenue
          </p>

          <h2 className="text-3xl font-bold text-blue-400 mt-2">
            ₹
            {plans.reduce(
              (sum, p) =>
                sum + Number(p.price),
              0
            )}
          </h2>
        </div>

      </div>

      <div className="bg-slate-900 rounded-2xl overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-800">
            <tr>
              <th className="p-4 text-left">
                User
              </th>

              <th className="p-4 text-left">
                Plan
              </th>

              <th className="p-4 text-left">
                Start Date
              </th>

              <th className="p-4 text-left">
                End Date
              </th>

              <th className="p-4 text-left">
                Status
              </th>
            </tr>
          </thead>

          <tbody>

            {subscriptions.map((sub) => (

              <tr
                key={sub.id}
                className="border-t border-slate-700"
              >
                <td className="p-4">
                  {sub.user}
                </td>

                <td className="p-4">
                  {sub.plan}
                </td>

                <td className="p-4">
                  {sub.start_date}
                </td>

                <td className="p-4">
                  {sub.end_date}
                </td>

                <td className="p-4">

                  <span
                    className={
                      sub.active
                        ? "text-green-400"
                        : "text-red-400"
                    }
                  >
                    {sub.active
                      ? "ACTIVE"
                      : "EXPIRED"}
                  </span>

                </td>
              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Add Subscription"
      >

        <div className="space-y-4">

          <select
            value={userId}
            onChange={(e) =>
              setUserId(e.target.value)
            }
            className="w-full bg-slate-800 text-white p-3 rounded-xl"
          >
            <option value="">
              Select User
            </option>

            {users.map((user) => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.username}
              </option>
            ))}
          </select>

          <select
            value={planId}
            onChange={(e) =>
              setPlanId(e.target.value)
            }
            className="w-full bg-slate-800 text-white p-3 rounded-xl"
          >
            <option value="">
              Select Plan
            </option>

            {plans.map((plan) => (
              <option
                key={plan.id}
                value={plan.id}
              >
                {plan.name}
              </option>
            ))}
          </select>

          <input
            type="date"
            value={startDate}
            onChange={(e) =>
              setStartDate(e.target.value)
            }
            className="w-full bg-slate-800 text-white p-3 rounded-xl"
          />

          <input
            type="date"
            value={endDate}
            onChange={(e) =>
              setEndDate(e.target.value)
            }
            className="w-full bg-slate-800 text-white p-3 rounded-xl"
          />

          <button
            onClick={addSubscription}
            className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded-xl"
          >
            Create Subscription
          </button>

        </div>

      </Modal>

    </div>
  );
}