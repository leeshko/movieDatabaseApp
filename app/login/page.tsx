"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";

const Login = () => {
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Invalid credentials. Please try again.");
    } else {
      window.location.href = "/";
    }
  };

  return (
    <div className="mt-10 max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white border border-[#121212] dark:bg-black">
      <h2 className="font-bold text-2xl text-center text-neutral-800 dark:text-neutral-200">
        Log In
      </h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="block mb-1 text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="email@email.com"
            required
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>

        <div>
          <label htmlFor="password" className="block mb-1 text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="********"
            required
            minLength={6}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>

        <button
          type="submit"
          className="mt-4 w-full h-10 rounded-md bg-gradient-to-br from-black to-gray-700 text-white font-medium hover:opacity-90 transition"
        >
          Log In →
        </button>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </form>

      <p className="text-neutral-600 text-sm text-center mt-6 dark:text-neutral-300">
        Don’t have an account?{" "}
        <Link href="/register" className="text-blue-500 hover:underline">
          Register
        </Link>
      </p>

      {/* // Can be uncommented if you want to add Google or other providers login option */}

      {/* <div className="flex items-center my-6">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-4 text-sm text-gray-500 dark:text-gray-400">
          OR
        </span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      <button
        onClick={() => signIn("google")}
        type="button"
        className="flex items-center justify-center gap-2 w-full h-10 rounded-md border border-gray-300 bg-gray-50 hover:bg-gray-100 transition dark:bg-zinc-900 dark:border-zinc-700 dark:hover:bg-zinc-800"
      >
        <IconBrandGoogle className="h-5 w-5" />
        <span className="text-sm font-medium">Sign in with Google</span>
      </button> */}
    </div>
  );
};

export default Login;
