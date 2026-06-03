"use client";

const payments = [
  {
    id: 1,
    tenant: "Acme Corp",
    amount: "₹4999",
    status: "Paid",
  },
  {
    id: 2,
    tenant: "TechFlow",
    amount: "₹9999",
    status: "Paid",
  },
];

export default function PaymentsPage() {
  return (
    <div className="p-8">

      <h1 className="text-4xl font-bold text-white mb-8">
        Payments
      </h1>

      <div className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800">

        <table className="w-full">

          <thead className="bg-slate-800 text-white">

            <tr>
              <th className="p-4 text-left">Tenant</th>
              <th className="p-4 text-left">Amount</th>
              <th className="p-4 text-left">Status</th>
            </tr>

          </thead>

          <tbody>

            {payments.map((payment) => (
              <tr
                key={payment.id}
                className="border-t border-slate-700 text-slate-300"
              >
                <td className="p-4">{payment.tenant}</td>
                <td className="p-4">{payment.amount}</td>
                <td className="p-4 text-green-400">
                  {payment.status}
                </td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}