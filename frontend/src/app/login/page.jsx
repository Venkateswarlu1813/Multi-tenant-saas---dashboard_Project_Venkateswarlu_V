"use client";

import { useState } from "react";
import API from "../../services/api";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { auth } from "../../firebase";
import { FcGoogle } from "react-icons/fc";

import {
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login/", {
        username,
        password,
      });

      console.log("LOGIN RESPONSE:", res.data);
      console.log("ROLE:", res.data.role);

      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("username", res.data.username);

      if (
        res.data.role === "ADMIN" ||
        res.data.role === "SUPER_ADMIN" ||
        res.data.role === "TENANT_ADMIN"
      ) {
        router.push("/dashboard");
      } else {
        router.push("/user");
      }
    } catch (err) {
      console.log("ERROR:", err);
      console.log("RESPONSE:", err.response);
      console.log("DATA:", err.response?.data);

      alert(
        JSON.stringify(
          err.response?.data || "Login Failed",
          null,
          2
        )
      );
    }
  };

  const handleGoogleLogin = async () => {
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

router.push("/user");

      router.push("/user");

    } catch (error) {
      console.log(error);
      alert("Google Login Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex items-center justify-center">
      <div className="w-[420px] p-10 rounded-3xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl">

        <h1 className="text-4xl font-bold text-white mb-2">
          SaaS Dashboard
        </h1>

        <p className="text-slate-300 mb-8">
          Login to continue
        </p>

        <input
          type="text"
          placeholder="Username"
          className="w-full p-4 mb-4 rounded-xl bg-slate-800 text-white border border-slate-700"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-4 mb-6 rounded-xl bg-slate-800 text-white border border-slate-700"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold p-4 rounded-xl"
        >
          Sign In
        </button>

        <button
          onClick={handleGoogleLogin}
          className="w-full mt-4 bg-white text-black p-4 rounded-xl flex items-center justify-center gap-3 font-semibold"
        >
          <FcGoogle size={24} />
          Continue with Google
        </button>

        <div className="mt-4 text-center">
          <Link
            href="/register"
            className="text-blue-400 hover:underline"
          >
            Create New Account
          </Link>
        </div>

        <div className="mt-3 text-center">
          <Link
            href="/forgot-password"
            className="text-blue-400 hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        <div className="mt-6 text-center text-slate-400 text-sm">
          Multi-Tenant SaaS Platform
        </div>

      </div>
    </div>
  );
}