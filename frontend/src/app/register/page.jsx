"use client";

import { useState } from "react";
import API from "../../services/api";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/register/", form);

      alert("Registration Successful");

      router.push("/login");
    } catch (err) {
      console.log(err);
      alert("Registration Failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="bg-slate-900 p-10 rounded-2xl w-[450px]">

        <h1 className="text-4xl font-bold text-white mb-8">
          Create Account
        </h1>

        <form onSubmit={handleRegister}>

          <input
            type="text"
            name="username"
            placeholder="Username"
            className="w-full p-4 mb-4 rounded bg-slate-800 text-white"
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-4 mb-4 rounded bg-slate-800 text-white"
            onChange={handleChange}
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            className="w-full p-4 mb-4 rounded bg-slate-800 text-white"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-4 mb-6 rounded bg-slate-800 text-white"
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 p-4 rounded text-white font-semibold"
          >
            Register
          </button>

        </form>

      </div>
    </div>
  );
}