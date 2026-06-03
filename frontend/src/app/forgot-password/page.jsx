"use client";

import { useState } from "react";
import API from "../../services/api";

export default function ForgotPassword() {

  const [email, setEmail] = useState("");

  const submit = async () => {

    try {

      await API.post(
        "/auth/forgot-password/",
        { email }
      );

      alert("Reset email sent");

    } catch {

      alert("Email not found");

    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex justify-center items-center">

      <div className="bg-slate-900 p-8 rounded-2xl w-[450px]">

        <h1 className="text-3xl font-bold text-white mb-6">
          Forgot Password
        </h1>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full p-4 rounded-xl bg-slate-800 text-white mb-4"
        />

        <button
          onClick={submit}
          className="w-full bg-blue-600 text-white p-4 rounded-xl"
        >
          Send Reset Email
        </button>

      </div>

    </div>
  );
}