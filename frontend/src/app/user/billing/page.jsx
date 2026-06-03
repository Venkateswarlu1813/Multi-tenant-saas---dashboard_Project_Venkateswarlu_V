"use client";

import { useEffect, useState } from "react";
import API from "../../../services/api";

export default function BillingPage() {

  const [payments, setPayments] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [successfulRevenue, setSuccessfulRevenue] = useState(0);
  const [pendingRevenue, setPendingRevenue] = useState(0);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const res = await API.get("/payments/");

      const data = res.data.results || res.data || [];

      setPayments(data);

      let total = 0;
      let success = 0;
      let pending = 0;

      data.forEach((item) => {
        const amount = Number(item.amount);

        total += amount;

        if (item.status === "SUCCESS") {
          success += amount;
        }

        if (item.status === "PENDING") {
          pending += amount;
        }
      });

      setTotalRevenue(total);
      setSuccessfulRevenue(success);
      setPendingRevenue(pending);

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-8 text-white">

      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Billing Dashboard
        </h1>

        <p className="text-slate-400 mt-2">
          Revenue, invoices and payment tracking
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <h2 className="text-slate-400">
            Total Revenue
          </h2>

          <p className="text-3xl font-bold mt-3 text-green-400">
            ₹{totalRevenue}
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <h2 className="text-slate-400">
            Pending Payments
          </h2>

          <p className="text-3xl font-bold mt-3 text-yellow-400">
            ₹{pendingRevenue}
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <h2 className="text-slate-400">
            Successful Payments
          </h2>

          <p className="text-3xl font-bold mt-3 text-blue-400">
            ₹{successfulRevenue}
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <h2 className="text-slate-400">
            Total Invoices
          </h2>

          <p className="text-3xl font-bold mt-3">
            {payments.length}
          </p>
        </div>

      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden mt-8">

        <div className="p-6 border-b border-slate-800">
          <h2 className="text-2xl font-bold">
            Recent Invoices
          </h2>
        </div>

        <table className="w-full text-white">

          <thead className="bg-slate-800">

            <tr>
              <th className="p-4 text-left">
                Invoice
              </th>

              <th className="p-4 text-left">
                Amount
              </th>

              <th className="p-4 text-left">
                Date
              </th>

              <th className="p-4 text-left">
                Status
              </th>
            </tr>

          </thead>

          <tbody>

            {payments.map((item) => (
              <tr
                key={item.id}
                className="border-t border-slate-700"
              >

                <td className="p-4">
                  {item.invoice_number}
                </td>

                <td className="p-4">
                  ₹{item.amount}
                </td>

                <td className="p-4">
                  {new Date(
                    item.created_at
                  ).toLocaleDateString()}
                </td>

                <td className="p-4">

                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      item.status === "SUCCESS"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {item.status}
                  </span>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}