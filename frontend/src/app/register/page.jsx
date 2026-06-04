"use client";

import { useState } from "react";
import API from "../../services/api";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

import { auth } from "../../firebase";

import {
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

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

  const handleGoogleSignup = async () => {
  try {
    const provider = new GoogleAuthProvider();

    const result = await signInWithPopup(
      auth,
      provider
    );

    const user = result.user;

    localStorage.setItem(
      "username",
      user.displayName || ""
    );

    localStorage.setItem(
      "email",
      user.email || ""
    );

    localStorage.setItem(
      "role",
      "USER"
    );

    localStorage.setItem(
      "access",
      "google-auth"
    );

    localStorage.setItem(
      "refresh",
      "google-auth"
    );

    alert("Google Signup Successful");

    router.push("/dashboard");

  } catch (error) {
    console.log(error);
    alert("Google Signup Failed");
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

          <button
            type="button"
            onClick={handleGoogleSignup}
            className="w-full mt-4 bg-white text-black p-4 rounded flex items-center justify-center gap-3 font-semibold"
          >
            <FcGoogle size={24} />
            Sign Up with Google
          </button>

          <div className="mt-4 text-center">
            <a
              href="/login"
              className="text-blue-400 hover:underline"
            >
              Already have an account? Login
            </a>
          </div>

        </form>

      </div>
    </div>
  );
}