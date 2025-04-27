import { register } from "@/action/user";
import Link from "next/link";
import React from "react";

const Register = async () => {
  return (
    <div className="mt-10 max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white border border-[#121212] dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        My name
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        {" "}
        please provide info
      </p>

      <form className="my-8 p-4 rounded-md shadow-md" action={register}>
        <label htmlFor="name" className="block mb-2">
          First Name
          <input
            id="name"
            name="name"
            type="text"
            placeholder="John"
            className="border border-gray-300 rounded-md p-2 w-full "
          />
        </label>
        <label htmlFor="email" className="block mb-2">
          Email
          <input
            id="email"
            name="email"
            type="email"
            placeholder="email@email.com"
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </label>
        <label htmlFor="password" className=" block mb-2">
          Password
          <input
            id="password"
            name="password"
            type="password"
            placeholder="********"
            className="border border-gray-300 rounded-md p-2 w-full mb-5"
          />
        </label>
        <button className=" cursor-pointer bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]">
          Sign up &rarr;
        </button>
        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
          Already have an account? <Link href="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
