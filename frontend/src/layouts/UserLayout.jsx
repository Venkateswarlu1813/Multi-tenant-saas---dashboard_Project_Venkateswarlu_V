"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function UserLayout({ children }) {
  const router = useRouter();

  const logout = () => {
    localStorage.clear();
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-white">

      <aside className="w-64 bg-slate-900 p-6">

        <h1 className="text-2xl font-bold mb-10">
          User Panel
        </h1>

        <nav className="space-y-4">

          <Link href="/user" className="block">
            Dashboard
          </Link>

          <Link href="/user/profile" className="block">
            Profile
          </Link>

          <Link href="/user/subscription" className="block">
            Subscription
          </Link>

          <Link href="/user/billing" className="block">
            Billing
          </Link>

          <Link href="/user/notifications" className="block">
            Notifications
          </Link>

        </nav>

        <button
          onClick={logout}
          className="mt-10 bg-red-600 px-4 py-2 rounded"
        >
          Logout
        </button>

      </aside>

      <main className="flex-1 p-6">
        {children}
      </main>

    </div>
  );
}