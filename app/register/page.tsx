import { register } from "@/action/user";
import Link from "next/link";
import React from "react";

const Register = () => {
  return (
    <div className="mt-10 max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white border border-[#121212] dark:bg-black">
      <h2 className="font-bold text-2xl text-neutral-800 dark:text-neutral-200 text-center">
        Create an Account
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 mb-6 dark:text-neutral-300 text-center">
        Please fill in the information below to create your account.
      </p>

      <form className="space-y-4" action={register}>
        <div>
          <label htmlFor="name" className="block mb-1 font-medium text-sm">
            First Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="John"
            required
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>

        <div>
          <label htmlFor="email" className="block mb-1 font-medium text-sm">
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
          <label htmlFor="password" className="block mb-1 font-medium text-sm">
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
          Sign Up →
        </button>

        <p className="text-neutral-600 text-sm text-center mt-4 dark:text-neutral-300">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
