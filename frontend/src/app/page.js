import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold mb-4">
        Multi-Tenant SaaS Dashboard
      </h1>

      <p className="text-slate-400 mb-8">
        Tenant Management • Billing • Subscriptions • Analytics
      </p>

      <div className="flex gap-4">
        <Link
          href="/login"
          className="bg-blue-600 px-6 py-3 rounded-lg"
        >
          Login
        </Link>

        <Link
          href="/register"
          className="bg-green-600 px-6 py-3 rounded-lg"
        >
          Register
        </Link>
      </div>
    </div>
  );
}