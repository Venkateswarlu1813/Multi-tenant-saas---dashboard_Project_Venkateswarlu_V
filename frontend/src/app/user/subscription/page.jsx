"use client";

import { useEffect, useState } from "react";
import API from "../../../services/api";

export default function SubscriptionPage() {

  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    fetchSubscription();
  }, []);

  const fetchSubscription = async () => {
    try {

      const res = await API.get("/subscriptions/");

      const data = res.data.results || res.data || [];

      if (data.length > 0) {
        setSubscription(data[0]);
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-8 text-white">

      <h1 className="text-4xl font-bold mb-8">
        My Subscription
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <h3 className="text-slate-400">
            Current Plan
          </h3>

          <p className="text-3xl font-bold mt-3">
            {subscription?.plan || "No Plan"}
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <h3 className="text-slate-400">
            Status
          </h3>

          <p className="text-3xl font-bold text-green-400 mt-3">
            {subscription?.active ? "Active" : "Inactive"}
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <h3 className="text-slate-400">
            Renewal Date
          </h3>

          <p className="text-2xl font-bold mt-3">
            {subscription?.end_date || "N/A"}
          </p>
        </div>

      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 mt-8">

        <h2 className="text-2xl font-bold mb-4">
          Subscription Details
        </h2>

        <div className="space-y-4 text-slate-300">

          <p>
            Plan: <span className="text-white">
              {subscription?.plan || "N/A"}
            </span>
          </p>

          <p>
            Start Date: <span className="text-white">
              {subscription?.start_date || "N/A"}
            </span>
          </p>

          <p>
            End Date: <span className="text-white">
              {subscription?.end_date || "N/A"}
            </span>
          </p>

          <p>
            Status: <span className="text-green-400">
              {subscription?.active ? "Active" : "Inactive"}
            </span>
          </p>

        </div>

      </div>

    </div>
  );
}